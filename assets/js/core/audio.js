/*
 * Áudio do Guia Braille.
 * Dois canais independentes:
 *   - "info": narração da página (pode ser desligada pelo usuário)
 *   - "fx":   sons dos jogos (letras, acerto, erro), sempre ativos
 * Substitui o antigo <embed> por objetos Audio.
 */
(function (GB) {
  'use strict';

  const base = (document.documentElement.dataset.base || '') + 'assets/audio/';

  const store = {
    get(chave) { try { return localStorage.getItem(chave); } catch (e) { return null; } },
    set(chave, valor) { try { localStorage.setItem(chave, valor); } catch (e) { /* sem storage */ } }
  };
  GB.store = store;

  let narracaoLigada = store.get('gb-narracao') !== 'off';
  const canais = { info: null, fx: null };
  const sequencias = { info: 0, fx: 0 };

  // Voz sintetizada do navegador (speechSynthesis), usada onde não há MP3 gravado
  const fala = 'speechSynthesis' in window ? window.speechSynthesis : null;

  function vozPortuguesa() {
    const vozes = fala.getVoices();
    const norm = v => v.lang.replace('_', '-').toLowerCase();
    return vozes.find(v => norm(v) === 'pt-br') || vozes.find(v => norm(v).indexOf('pt') === 0) || null;
  }

  function pararFala() {
    if (fala) fala.cancel();
  }

  function pararCanal(canal) {
    const atual = canais[canal];
    if (!atual) return;
    canais[canal] = null;
    atual.audio.pause();
    atual.resolver('parado');
  }

  // Resolve com: 'fim' | 'parado' | 'bloqueado' (autoplay) | 'erro' (arquivo ausente)
  function tocar(nome, canal) {
    return new Promise(resolver => {
      pararCanal(canal);
      const audio = new Audio(base + nome + '.mp3');
      const registro = { audio, resolver };
      canais[canal] = registro;

      audio.addEventListener('ended', () => {
        if (canais[canal] === registro) canais[canal] = null;
        resolver('fim');
      });
      audio.addEventListener('error', () => {
        if (canais[canal] === registro) canais[canal] = null;
        resolver('erro');
      });

      const promessa = audio.play();
      if (promessa && promessa.catch) {
        promessa.catch(erro => {
          if (canais[canal] === registro) canais[canal] = null;
          resolver(erro && erro.name === 'NotAllowedError' ? 'bloqueado' : 'erro');
        });
      }
    });
  }

  async function tocarSequencia(nomes, canal) {
    const id = ++sequencias[canal];
    for (const nome of nomes) {
      if (id !== sequencias[canal]) return 'parado';
      const resultado = await tocar(nome, canal);
      if (resultado !== 'fim') return resultado;
    }
    return 'fim';
  }

  function parar(canal) {
    sequencias[canal]++;
    pararCanal(canal);
  }

  const PAUSA_ENTRE_FRASES = 900;   // ms

  async function falarFrases(frases, opcoes) {
    if (!narracaoLigada || !fala) return 'desligado';
    if (!(opcoes && opcoes.fila)) {
      sequencias.info++;
      pararCanal('info');
      pararFala();
    }
    const id = sequencias.info;
    for (let i = 0; i < frases.length; i++) {
      if (id !== sequencias.info) return 'parado';
      const resultado = await GB.audio.falar(frases[i], { fila: true });
      if (resultado !== 'fim') return resultado;
      if (i < frases.length - 1) await new Promise(r => setTimeout(r, PAUSA_ENTRE_FRASES));
    }
    return 'fim';
  }

  GB.audio = {
    narrar(nome) {
      if (!narracaoLigada) return Promise.resolve('desligado');
      pararFala();
      sequencias.info++;
      return tocar(nome, 'info');
    },
    // Fala um texto com a voz do navegador. Obedece ao botão de narração.
    // Com { fila: true } espera a fala atual terminar em vez de interrompê-la.
    // Resolve com: 'fim' | 'bloqueado' (sem interação do usuário ainda) | 'erro' | 'desligado'
    // Aceita uma lista de frases: elas são ditas em sequência, com uma pausa entre cada uma.
    falar(texto, opcoes) {
      if (Array.isArray(texto)) return falarFrases(texto, opcoes);
      return new Promise(resolver => {
        if (!narracaoLigada || !fala || !texto) { resolver('desligado'); return; }
        if (!(opcoes && opcoes.fila)) {
          sequencias.info++;
          pararCanal('info');
          pararFala();
        }
        const fala1 = new SpeechSynthesisUtterance(texto);
        fala1.lang = 'pt-BR';
        const voz = vozPortuguesa();
        if (voz) fala1.voice = voz;
        fala1.onend = () => resolver('fim');
        fala1.onerror = e => resolver(e && e.error === 'not-allowed' ? 'bloqueado' : 'erro');
        fala.speak(fala1);
      });
    },
    efeito(nome) {
      sequencias.fx++;
      return tocar(nome, 'fx');
    },
    sequencia(nomes) { return tocarSequencia(nomes, 'fx'); },
    parar(canal) {
      if (canal) parar(canal);
      else { parar('info'); parar('fx'); }
      if (!canal || canal === 'info') pararFala();
    },
    narracaoLigada() { return narracaoLigada; },
    definirNarracao(ligada) {
      narracaoLigada = ligada;
      store.set('gb-narracao', ligada ? 'on' : 'off');
      if (!ligada) { parar('info'); pararFala(); }
    },
    // Navegadores bloqueiam áudio antes da primeira interação: tenta de novo no primeiro gesto
    aoPrimeiroGesto(funcao) {
      const eventos = ['keydown', 'pointerdown', 'touchstart'];
      const disparar = () => {
        eventos.forEach(e => document.removeEventListener(e, disparar, true));
        funcao();
      };
      eventos.forEach(e => document.addEventListener(e, disparar, true));
    }
  };
})(window.GB = window.GB || {});
