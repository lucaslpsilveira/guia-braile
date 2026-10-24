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

  GB.audio = {
    narrar(nome) {
      if (!narracaoLigada) return Promise.resolve('desligado');
      sequencias.info++;
      return tocar(nome, 'info');
    },
    efeito(nome) {
      sequencias.fx++;
      return tocar(nome, 'fx');
    },
    sequencia(nomes) { return tocarSequencia(nomes, 'fx'); },
    parar(canal) {
      if (canal) parar(canal);
      else { parar('info'); parar('fx'); }
    },
    narracaoLigada() { return narracaoLigada; },
    definirNarracao(ligada) {
      narracaoLigada = ligada;
      store.set('gb-narracao', ligada ? 'on' : 'off');
      if (!ligada) parar('info');
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
