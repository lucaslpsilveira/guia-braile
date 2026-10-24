/*
 * Cabeçalho, rodapé e narração por foco, compartilhados por todas as páginas.
 * Elementos com data-audio="pasta/arquivo" tocam a narração ao receber foco (Tab).
 */
(function (GB) {
  'use strict';

  const base = document.documentElement.dataset.base || '';
  const paginaAtual = document.body.dataset.page || '';
  let introEmCurso = null;   // promessa da introdução falada, enquanto ela estiver sendo dita

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
      '<button type="button" class="btn-narracao" tabindex="-1"><span class="icone" aria-hidden="true"></span><span class="rotulo"></span></button>' +
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
    // O texto do botão diz a ação que o clique vai fazer
    const atualizarNarracao = () => {
      const ligada = GB.audio.narracaoLigada();
      botaoNarracao.querySelector('.icone').textContent = ligada ? '🔊' : '🔇';
      botaoNarracao.querySelector('.rotulo').textContent = ligada ? 'Desativar narração' : 'Ativar narração';
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
    link.dataset.fala = 'Pular para o conteúdo. Pressione Enter.';
    // Enter leva o foco direto ao primeiro item do conteúdo (que já narra a explicação)
    link.addEventListener('click', e => {
      const primeiro = Array.from(principal.querySelectorAll('a[href], button:not([disabled]), input, textarea, select, [tabindex]'))
        .find(el => el.tabIndex >= 0 && el.offsetParent !== null);
      if (!primeiro) return;
      e.preventDefault();
      primeiro.focus();
    });
    document.body.prepend(link);
  }

  // Narração ao focar um elemento com data-audio (e ao clicar nos botões "Ouvir")
  function ligarNarracaoPorFoco() {
    let ultimo = { nome: '', quando: 0 };
    // data-audio="pasta/arquivo" toca um MP3; data-fala="texto" fala com a voz do navegador
    const narrar = el => {
      const chave = el.dataset.audio || el.dataset.fala;   // frases de uma fala podem vir separadas por |
      const agora = Date.now();
      // Clique de mouse dispara foco e clique quase juntos: evita tocar duas vezes
      if (ultimo.nome === chave && agora - ultimo.quando < 500) return;
      ultimo = { nome: chave, quando: agora };
      if (el.dataset.audio) GB.audio.narrar(el.dataset.audio);
      else if (introEmCurso && el.classList.contains('pular-conteudo')) {
        // Só o link "Pular para o conteúdo" espera a introdução terminar; os demais a interrompem
        introEmCurso.then(() => {
          if (document.activeElement === el) GB.audio.falar(el.dataset.fala.split('|'));
        });
      } else GB.audio.falar(el.dataset.fala.split('|'));
    };

    document.addEventListener('focusin', e => {
      const el = e.target.closest && e.target.closest('[data-audio], [data-fala]');
      if (el) narrar(el);
    });
    document.addEventListener('click', e => {
      const el = e.target.closest && e.target.closest('.btn-ouvir');
      if (el) narrar(el);
    });
  }

  // Atalhos: Alt+1 ou Alt+I vão para o menu; Alt+R volta ao ponto onde o foco estava antes.
  function ligarAtalhos() {
    const FOCAVEIS = 'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]';
    let anterior = null;

    const focaveisVisiveis = () => Array.from(document.querySelectorAll(FOCAVEIS))
      .filter(el => el.tabIndex >= 0 && el.offsetParent !== null);

    const fecharMenu = () => {
      const nav = document.getElementById('nav-principal');
      const botao = document.querySelector('.menu-toggle');
      if (nav && nav.classList.contains('aberto')) {
        nav.classList.remove('aberto');
        botao.setAttribute('aria-expanded', 'false');
      }
    };

    function irParaMenu() {
      const nav = document.getElementById('nav-principal');
      if (!nav) return;
      if (!nav.contains(document.activeElement)) anterior = document.activeElement;
      const botao = document.querySelector('.menu-toggle');
      if (botao && botao.offsetParent !== null) {          // celular: menu recolhido
        nav.classList.add('aberto');
        botao.setAttribute('aria-expanded', 'true');
      }
      const primeiro = nav.querySelector('a');
      if (primeiro) primeiro.focus();
    }

    function voltar() {
      fecharMenu();
      if (anterior && document.contains(anterior) && anterior !== document.body) {
        anterior.focus();
        anterior = null;
        return;
      }
      // Sem ponto guardado: anda um elemento para trás
      const lista = focaveisVisiveis();
      const i = lista.indexOf(document.activeElement);
      if (i > 0) lista[i - 1].focus();
    }

    // event.code vale para qualquer layout de teclado (com Alt, event.key pode mudar)
    document.addEventListener('keydown', e => {
      if (!e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (e.code === 'Digit1' || e.code === 'Numpad1' || e.code === 'KeyI') { e.preventDefault(); irParaMenu(); }
      else if (e.code === 'KeyR') { e.preventDefault(); voltar(); }
    });
  }

  function tocarIntroducao() {
    const intro = document.body.dataset.intro;
    if (!intro) return;
    const tocar = () => {
      introEmCurso = GB.audio.narrar(intro).then(resultado => {
        introEmCurso = null;
        return resultado;
      });
      return introEmCurso;
    };
    tocar().then(resultado => {
      // Navegador bloqueou o áudio automático: começa na primeira tecla ou toque
      if (resultado === 'bloqueado') GB.audio.aoPrimeiroGesto(tocar);
    });
  }

  function iniciar() {
    montarLinkPular();
    montarCabecalho();
    montarRodape();
    ligarNarracaoPorFoco();
    ligarAtalhos();
    tocarIntroducao();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})(window.GB = window.GB || {});
