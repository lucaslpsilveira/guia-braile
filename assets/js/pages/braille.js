/*
 * Página "Braille": área de prática. Ao pressionar uma tecla do teclado adaptado, toca o som da letra
 * e mostra como ela é em Braille. No celular, o teclado de 6 pontos faz o caminho inverso.
 */
(function (GB) {
  'use strict';

  function iniciar() {
    const editor = document.getElementById('editor');
    const letra = document.getElementById('pratica-letra');
    const celaBox = document.getElementById('pratica-cela');
    const aviso = document.getElementById('pratica-aviso');
    const tecladoBox = document.getElementById('teclado-pratica');
    if (!editor) return;

    function mostrar(caractere) {
      letra.textContent = caractere.toUpperCase();
      celaBox.textContent = '';
      // Dígitos usam o mesmo desenho das letras a-j (precedidos do sinal de número)
      const porDigito = { '1': 'a', '2': 'b', '3': 'c', '4': 'd', '5': 'e', '6': 'f', '7': 'g', '8': 'h', '9': 'i', '0': 'j' };
      const ref = porDigito[caractere] || caractere;
      celaBox.appendChild(GB.braille.criarCela(GB.braille.pontosDaLetra(ref), true));
      aviso.textContent = 'Tecla ' + caractere.toUpperCase();
    }

    editor.addEventListener('keydown', e => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      GB.audio.parar('info');           // quem já sabe usar pode digitar sem esperar a instrução terminar
      const som = GB.braille.somDaTecla(e);
      if (som) GB.audio.efeito(som);
      const c = GB.braille.caractereDaTecla(e);
      if (c) mostrar(c);
    });

    const grade = document.getElementById('alfabeto-grade');
    Object.keys(GB.braille.letras).forEach(l => {
      const li = document.createElement('li');
      const rotulo = document.createElement('span');
      rotulo.textContent = l.toUpperCase();
      const pontos = GB.braille.pontosDaLetra(l);
      const descricao = 'Letra ' + l.toUpperCase() + ': ' + GB.braille.descreverPontos(pontos);
      li.setAttribute('aria-label', descricao);
      li.tabIndex = 0;                  // com Tab, cada letra é falada
      li.dataset.fala = descricao;
      li.append(GB.braille.criarCela(pontos, false), rotulo);
      grade.appendChild(li);
    });

    GB.criarTecladoBraille({
      container: tecladoBox,
      fisico: false,
      aoConfirmar: pontos => {
        const c = GB.braille.interpretar(pontos, false);
        if (!c) {
          aviso.textContent = 'Essa combinação de pontos não é uma letra.';
          GB.audio.falar(aviso.textContent);
          return;
        }
        editor.value += c;
        GB.audio.efeito(GB.braille.somDoCaractere(c));
        mostrar(c);
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})(window.GB = window.GB || {});
