/*
 * Teclado Braille de 6 pontos.
 *  - Na tela: botões que alternam cada ponto, mais "Confirmar" e "Limpar" (funciona com toque).
 *  - No teclado físico: F D S (pontos 1 2 3) e J K L (pontos 4 5 6), pressionados juntos;
 *    ao soltar todas as teclas a combinação é confirmada.
 */
(function (GB) {
  'use strict';

  const ROTULOS = { 1: 'Ponto 1', 2: 'Ponto 2', 3: 'Ponto 3', 4: 'Ponto 4', 5: 'Ponto 5', 6: 'Ponto 6' };
  const TECLAS = { 1: 'F', 2: 'D', 3: 'S', 4: 'J', 5: 'K', 6: 'L' };

  GB.criarTecladoBraille = function (opcoes) {
    const raiz = opcoes.container;
    const aoConfirmar = opcoes.aoConfirmar;
    const selecionados = new Set();
    const seguradas = new Set();
    let fisico = !!opcoes.fisico;
    let desabilitado = false;

    raiz.classList.add('teclado-braille');
    raiz.innerHTML =
      '<div class="teclado-pontos" role="group" aria-label="Pontos Braille"></div>' +
      '<div class="teclado-acoes">' +
      '<button type="button" class="btn secundario" data-acao="limpar">Limpar</button>' +
      '<button type="button" class="btn" data-acao="confirmar">Confirmar</button>' +
      '</div>' +
      '<p class="sr-only" role="status" aria-live="polite"></p>';

    const grade = raiz.querySelector('.teclado-pontos');
    const aviso = raiz.querySelector('[role="status"]');
    const botoes = {};

    for (let n = 1; n <= 6; n++) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'ponto-btn';
      b.setAttribute('aria-pressed', 'false');
      b.setAttribute('aria-label', ROTULOS[n]);
      b.innerHTML = n + '<small>' + TECLAS[n] + '</small>';
      b.addEventListener('click', () => alternar(n));
      grade.appendChild(b);
      botoes[n] = b;
    }

    function atualizar() {
      for (let n = 1; n <= 6; n++) {
        botoes[n].setAttribute('aria-pressed', selecionados.has(n) ? 'true' : 'false');
      }
      const lista = Array.from(selecionados).sort();
      aviso.textContent = lista.length ? 'Pontos marcados: ' + lista.join(', ') : 'Nenhum ponto marcado';
    }

    function alternar(n) {
      if (desabilitado) return;
      if (selecionados.has(n)) selecionados.delete(n); else selecionados.add(n);
      atualizar();
    }

    function limpar() {
      selecionados.clear();
      seguradas.clear();
      atualizar();
    }

    function confirmar() {
      if (desabilitado || selecionados.size === 0) return;
      const pontos = Array.from(selecionados).sort();
      limpar();
      aoConfirmar(pontos);
    }

    raiz.querySelector('[data-acao="limpar"]').addEventListener('click', limpar);
    raiz.querySelector('[data-acao="confirmar"]').addEventListener('click', confirmar);

    function campoDeTexto(alvo) {
      return alvo && (alvo.tagName === 'TEXTAREA' || (alvo.tagName === 'INPUT' && alvo.type === 'text'));
    }

    document.addEventListener('keydown', e => {
      if (!fisico || desabilitado || e.repeat || e.ctrlKey || e.altKey || e.metaKey) return;
      if (campoDeTexto(e.target)) return;
      const n = GB.braille.pontoDaTecla(e);
      if (!n) return;
      e.preventDefault();
      seguradas.add(e.code);
      selecionados.add(n);
      atualizar();
    });

    document.addEventListener('keyup', e => {
      if (!fisico || desabilitado || !seguradas.has(e.code)) return;
      seguradas.delete(e.code);
      if (seguradas.size === 0) confirmar();
    });

    return {
      limpar,
      definirFisico(ativo) { fisico = !!ativo; limpar(); },
      definirDesabilitado(valor) {
        desabilitado = !!valor;
        raiz.querySelectorAll('button').forEach(b => { b.disabled = desabilitado; });
        if (desabilitado) limpar();
      }
    };
  };
})(window.GB = window.GB || {});
