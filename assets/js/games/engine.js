/*
 * Motor comum dos jogos de Braille.
 * Cada jogo informa como gerar uma pergunta e quais sons tocar; o motor cuida das rodadas,
 * da entrada (teclado adaptado ou teclado Braille de 6 pontos), do feedback e do ranking.
 *
 * Pergunta: { exibir: 'B', resposta: 'b', sons: ['letras/66'] }
 */
(function (GB) {
  'use strict';

  const $ = id => document.getElementById(id);

  GB.iniciarJogo = function (config) {
    const RODADAS = config.rodadas || 10;
    const numerico = !!config.numerico;
    const aceita = numerico ? /^[0-9]$/ : /^[a-z]$/;

    const el = {
      pergunta: $('jogo-pergunta'),
      feedback: $('jogo-feedback'),
      rodada: $('jogo-rodada'),
      pontos: $('jogo-pontos'),
      iniciar: $('btn-iniciar'),
      repetir: $('btn-repetir'),
      ajuda: $('jogo-ajuda'),
      telaJogo: $('tela-jogo'),
      telaFim: $('tela-fim'),
      resumo: $('fim-resumo'),
      formRanking: $('form-ranking'),
      nome: $('ranking-nome'),
      lista: $('lista-ranking'),
      reiniciar: $('btn-reiniciar'),
      teclado: $('teclado-braille'),
      escolhaModo: document.querySelector('.jogo-modo'),
      modos: document.querySelectorAll('input[name="modo"]')
    };

    let estado = 'parado';   // parado | jogando | fim
    let aceitando = false;
    let rodada = 0;
    let acertos = 0;
    let atual = null;
    let modo = lerModoInicial();
    const aguardar = ms => new Promise(r => setTimeout(r, ms));

    const teclado = GB.criarTecladoBraille({
      container: el.teclado,
      fisico: modo === 'pontos',
      aoConfirmar: pontos => {
        if (estado !== 'jogando' || !aceitando) return;
        const valor = GB.braille.interpretar(pontos, numerico);
        if (valor === null) return mostrar('Combinação inválida. Tente de novo.', 'erro', true);
        responder(valor);
      }
    });
    teclado.definirDesabilitado(true);

    function lerModoInicial() {
      const salvo = GB.store.get('gb-modo');
      if (salvo === 'adaptado' || salvo === 'pontos') return salvo;
      return window.matchMedia('(pointer: coarse)').matches ? 'pontos' : 'adaptado';
    }

    function aplicarModo() {
      el.teclado.hidden = modo !== 'pontos';
      teclado.definirFisico(modo === 'pontos');
      el.modos.forEach(r => { r.checked = r.value === modo; });
      el.ajuda.textContent = modo === 'pontos'
        ? 'Toque nos pontos (ou use as teclas F D S J K L juntas) e confirme.'
        : 'Pressione no teclado adaptado a tecla que corresponde ao que você ouviu.';
    }

    function mostrar(texto, classe, vibrar) {
      el.feedback.textContent = texto;
      el.feedback.className = 'jogo-feedback' + (classe ? ' ' + classe : '');
      if (vibrar && navigator.vibrate) navigator.vibrate(classe === 'ok' ? 60 : [80, 60, 80]);
    }

    function atualizarStatus() {
      el.rodada.textContent = 'Rodada ' + rodada + ' de ' + RODADAS;
      el.pontos.textContent = 'Acertos: ' + acertos;
    }

    function falarPergunta() {
      if (atual) GB.audio.sequencia(atual.sons);
    }

    function proximaRodada() {
      rodada++;
      atual = config.gerarPergunta();
      el.pergunta.textContent = atual.exibir;
      mostrar('', '');
      atualizarStatus();
      aceitando = true;
      falarPergunta();
    }

    async function responder(valor) {
      if (!aceitando) return;
      aceitando = false;
      GB.audio.parar();
      const acertou = valor === atual.resposta;
      if (acertou) acertos++;
      atualizarStatus();
      mostrar(acertou ? 'Acertou! 🎉' : 'Errou. Resposta: ' + atual.resposta.toUpperCase(), acertou ? 'ok' : 'erro', true);
      await Promise.all([
        GB.audio.efeito(acertou ? config.somAcerto : config.somErro),
        aguardar(1400)
      ]);
      if (estado !== 'jogando') return;
      if (rodada >= RODADAS) finalizar(); else proximaRodada();
    }

    async function comecar() {
      estado = 'jogando';
      rodada = 0;
      acertos = 0;
      el.telaFim.hidden = true;
      el.telaJogo.hidden = false;
      el.iniciar.hidden = true;
      el.escolhaModo.hidden = true;   // libera espaço para o teclado em telas pequenas
      el.repetir.hidden = false;
      teclado.definirDesabilitado(false);
      el.pergunta.textContent = '…';
      mostrar('', '');
      aceitando = false;
      atualizarStatus();
      if (config.somInicio) await GB.audio.efeito(config.somInicio);
      if (estado === 'jogando') proximaRodada();
    }

    function finalizar() {
      estado = 'fim';
      aceitando = false;
      teclado.definirDesabilitado(true);
      el.telaJogo.hidden = true;
      el.telaFim.hidden = false;
      el.resumo.textContent = 'Você acertou ' + acertos + ' de ' + RODADAS + '.';
      GB.ranking.desenhar(config.id, el.lista);
      el.formRanking.hidden = false;
      el.resumo.setAttribute('tabindex', '-1');
      el.resumo.focus();
      GB.audio.efeito('letras/acerto' + acertos);
    }

    // Eventos
    el.iniciar.addEventListener('click', comecar);
    el.repetir.addEventListener('click', falarPergunta);
    el.reiniciar.addEventListener('click', () => {
      GB.audio.parar();
      estado = 'parado';
      el.telaFim.hidden = true;
      el.telaJogo.hidden = false;
      el.iniciar.hidden = false;
      el.escolhaModo.hidden = false;
      el.repetir.hidden = true;
      el.pergunta.textContent = '';
      mostrar('', '');
      el.iniciar.focus();
    });

    el.formRanking.addEventListener('submit', e => {
      e.preventDefault();
      GB.ranking.salvar(config.id, el.nome.value, acertos);
      GB.ranking.desenhar(config.id, el.lista);
      el.formRanking.hidden = true;
      el.nome.value = '';
      el.reiniciar.focus();
    });

    el.modos.forEach(r => r.addEventListener('change', () => {
      modo = r.value;
      GB.store.set('gb-modo', modo);
      aplicarModo();
    }));

    document.addEventListener('keydown', e => {
      if (estado !== 'jogando' || e.ctrlKey || e.altKey || e.metaKey) return;
      const tag = e.target.tagName;

      if (e.key === 'Enter' && tag !== 'BUTTON' && tag !== 'A') {
        e.preventDefault();
        falarPergunta();
        return;
      }
      // No teclado adaptado, cada tecla de letra/número é a resposta
      if (modo === 'adaptado' && aceitando && !(tag === 'INPUT' && e.target.type === 'text')) {
        const c = GB.braille.caractereDaTecla(e);
        if (c && aceita.test(c)) {
          e.preventDefault();
          responder(c);
        }
      }
    });

    aplicarModo();
    el.repetir.hidden = true;
  };
})(window.GB = window.GB || {});
