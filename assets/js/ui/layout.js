/*
 * Cabeçalho, rodapé e narração por foco, compartilhados por todas as páginas.
 * Elementos com data-audio="pasta/arquivo" tocam a narração ao receber foco (Tab).
 */
(function (GB) {
  'use strict';

  const base = document.documentElement.dataset.base || '';
  const paginaAtual = document.body.dataset.page || '';

  const MENU = [
    { id: 'projeto', texto: 'Projeto', href: 'pages/projeto.html', audio: 'menu/audio2' },
    { id: 'braille', texto: 'Braille', href: 'pages/braille.html', audio: 'menu/audio3' },
    { id: 'jogos', texto: 'Jogo', href: 'pages/jogos.html', audio: 'menu/audio4' },
    { id: 'teclado', texto: 'Faça seu teclado', href: 'pages/teclado.html', audio: 'menu/audio5' }
  ];

  function montarCabecalho() {
    const alvo = document.getElementById('site-header');
    if (!alvo) return;

    const itens = MENU.map(item =>
      '<li><a href="' + base + item.href + '" data-audio="' + item.audio + '"' +
      (item.id === paginaAtual ? ' aria-current="page"' : '') + '>' + item.texto + '</a></li>'
    ).join('');

    alvo.outerHTML =
      '<header class="site-header"><div class="container">' +
      '<a class="marca" href="' + base + 'index.html" data-audio="menu/audio1">' +
      '<img src="' + base + 'assets/img/logo.png" alt="" width="44" height="44"><span>Guia Braille</span></a>' +
      '<button type="button" class="btn-narracao" aria-pressed="true" aria-label="Narração das páginas" title="Liga ou desliga a narração das páginas">🔊<span class="rotulo"> Narração</span></button>' +
      '<button type="button" class="menu-toggle" aria-expanded="false" aria-controls="nav-principal">Menu</button>' +
      '<nav class="nav-principal" id="nav-principal" aria-label="Principal"><ul>' + itens + '</ul></nav>' +
      '</div></header>';

    const botaoMenu = document.querySelector('.menu-toggle');
    const nav = document.getElementById('nav-principal');
    botaoMenu.addEventListener('click', () => {
      const aberto = nav.classList.toggle('aberto');
      botaoMenu.setAttribute('aria-expanded', String(aberto));
    });

    const botaoNarracao = document.querySelector('.btn-narracao');
    const atualizarNarracao = () => {
      botaoNarracao.setAttribute('aria-pressed', String(GB.audio.narracaoLigada()));
    };
    atualizarNarracao();
    botaoNarracao.addEventListener('click', () => {
      GB.audio.definirNarracao(!GB.audio.narracaoLigada());
      atualizarNarracao();
    });
  }

  function montarRodape() {
    const alvo = document.getElementById('site-footer');
    if (!alvo) return;
    alvo.outerHTML =
      '<footer class="site-footer"><div class="container">' +
      '<p>Contato: <a href="mailto:GuiaBraille@gmail.com">GuiaBraille@gmail.com</a></p>' +
      '<p>Brasil | Rio Grande do Sul | Instituto Federal Sul-Rio-Grandense, Campus Charqueadas</p>' +
      '<p class="copyright">© 2014 Guia Braille</p>' +
      '</div></footer>';
  }

  function montarLinkPular() {
    const principal = document.querySelector('main');
    if (!principal) return;
    principal.id = principal.id || 'conteudo';
    const link = document.createElement('a');
    link.className = 'pular-conteudo';
    link.href = '#' + principal.id;
    link.textContent = 'Pular para o conteúdo';
    document.body.prepend(link);
  }

  // Narração ao focar um elemento com data-audio (e ao clicar nos botões "Ouvir")
  function ligarNarracaoPorFoco() {
    let ultimo = { nome: '', quando: 0 };
    const narrar = nome => {
      const agora = Date.now();
      // Clique de mouse dispara foco e clique quase juntos: evita tocar duas vezes
      if (ultimo.nome === nome && agora - ultimo.quando < 500) return;
      ultimo = { nome: nome, quando: agora };
      GB.audio.narrar(nome);
    };

    document.addEventListener('focusin', e => {
      const el = e.target.closest && e.target.closest('[data-audio]');
      if (el) narrar(el.dataset.audio);
    });
    document.addEventListener('click', e => {
      const el = e.target.closest && e.target.closest('.btn-ouvir');
      if (el) narrar(el.dataset.audio);
    });
  }

  function tocarIntroducao() {
    const intro = document.body.dataset.intro;
    if (!intro) return;
    GB.audio.narrar(intro).then(resultado => {
      if (resultado === 'bloqueado') {
        GB.audio.aoPrimeiroGesto(() => GB.audio.narrar(intro));
      }
    });
  }

  function iniciar() {
    montarLinkPular();
    montarCabecalho();
    montarRodape();
    ligarNarracaoPorFoco();
    tocarIntroducao();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})(window.GB = window.GB || {});
