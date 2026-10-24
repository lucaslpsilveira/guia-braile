/*
 * Slideshow simples (substitui o jQuery Cycle). Avança sozinho, pausa com foco ou mouse
 * e não avança automaticamente para quem prefere menos movimento.
 */
(function () {
  'use strict';

  function iniciar() {
    const raiz = document.querySelector('.slideshow');
    if (!raiz) return;
    const slides = Array.from(raiz.querySelectorAll('li'));
    if (slides.length < 2) { if (slides[0]) slides[0].classList.add('ativo'); return; }

    const controles = document.createElement('div');
    controles.className = 'slideshow-controles';
    const anterior = botao('‹', 'Slide anterior');
    const proximo = botao('›', 'Próximo slide');
    controles.appendChild(anterior);
    const pontos = slides.map((_, i) => {
      const p = botao('', 'Ir para o slide ' + (i + 1));
      p.classList.add('ponto');
      p.addEventListener('click', () => ir(i));
      controles.appendChild(p);
      return p;
    });
    controles.appendChild(proximo);
    raiz.appendChild(controles);

    let atual = 0;
    let timer = null;
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function botao(texto, rotulo) {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = texto;
      b.setAttribute('aria-label', rotulo);
      return b;
    }

    function ir(indice) {
      atual = (indice + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('ativo', i === atual));
      pontos.forEach((p, i) => p.setAttribute('aria-current', String(i === atual)));
    }

    function comecar() { if (!reduzir && !timer) timer = setInterval(() => ir(atual + 1), 6000); }
    function pausar() { clearInterval(timer); timer = null; }

    anterior.addEventListener('click', () => ir(atual - 1));
    proximo.addEventListener('click', () => ir(atual + 1));
    raiz.addEventListener('mouseenter', pausar);
    raiz.addEventListener('mouseleave', comecar);
    raiz.addEventListener('focusin', pausar);
    raiz.addEventListener('focusout', comecar);

    ir(0);
    comecar();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
