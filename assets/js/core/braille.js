/*
 * Dados do sistema Braille e utilitários de teclado.
 * Cada letra é descrita pelos pontos em relevo (numerados 1 a 6):
 *   1 4
 *   2 5
 *   3 6
 */
(function (GB) {
  'use strict';

  const LETRAS = {
    a: [1], b: [1, 2], c: [1, 4], d: [1, 4, 5], e: [1, 5],
    f: [1, 2, 4], g: [1, 2, 4, 5], h: [1, 2, 5], i: [2, 4], j: [2, 4, 5],
    k: [1, 3], l: [1, 2, 3], m: [1, 3, 4], n: [1, 3, 4, 5], o: [1, 3, 5],
    p: [1, 2, 3, 4], q: [1, 2, 3, 4, 5], r: [1, 2, 3, 5], s: [2, 3, 4], t: [2, 3, 4, 5],
    u: [1, 3, 6], v: [1, 2, 3, 6], w: [2, 4, 5, 6], x: [1, 3, 4, 6], y: [1, 3, 4, 5, 6], z: [1, 3, 5, 6]
  };

  // Em modo numérico, as dez primeiras letras (a-j) representam 1 a 9 e 0
  const DIGITOS = { a: '1', b: '2', c: '3', d: '4', e: '5', f: '6', g: '7', h: '8', i: '9', j: '0' };

  const chave = pontos => pontos.slice().sort((x, y) => x - y).join('');

  const POR_PONTOS = {};
  Object.keys(LETRAS).forEach(letra => { POR_PONTOS[chave(LETRAS[letra])] = letra; });

  // Teclas físicas usadas como teclado Braille (padrão "Perkins": F D S | J K L)
  const TECLA_PONTO = { KeyF: 1, KeyD: 2, KeyS: 3, KeyJ: 4, KeyK: 5, KeyL: 6 };

  // Os arquivos de som foram nomeados com o código numérico antigo de cada tecla
  const CODIGOS_ESPECIAIS = {
    Backspace: 8, Tab: 9, Enter: 13, ShiftLeft: 16, ShiftRight: 16, ControlLeft: 17, ControlRight: 17,
    AltLeft: 18, AltRight: 18, CapsLock: 20, Escape: 27, Space: 32, PageUp: 33, PageDown: 34, End: 35,
    Home: 36, ArrowLeft: 37, ArrowUp: 38, ArrowRight: 39, ArrowDown: 40, Insert: 45, Delete: 46,
    Semicolon: 186, Equal: 187, Comma: 188, Minus: 189, Period: 190, Slash: 191, Backquote: 192,
    BracketLeft: 219, BracketRight: 221, Quote: 222, IntlBackslash: 226
  };

  const SONS_EXISTENTES = new Set([8, 9, 13, 16, 17, 18, 20, 27, 32, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46,
    186, 187, 188, 189, 190, 191, 192, 193, 219, 221, 222, 226]);

  function codigoDaTecla(evento) {
    const code = evento.code || '';
    let m;
    if ((m = /^Key([A-Z])$/.exec(code))) return m[1].charCodeAt(0);
    if ((m = /^(?:Digit|Numpad)([0-9])$/.exec(code))) return 48 + Number(m[1]);
    if ((m = /^F([1-9]|1[0-2])$/.exec(code))) return 111 + Number(m[1]);
    return CODIGOS_ESPECIAIS[code] || 0;
  }

  GB.braille = {
    letras: LETRAS,

    pontosDaLetra(letra) { return LETRAS[letra] || []; },

    // pontos -> letra (ou dígito, em modo numérico). Retorna null se não existir
    interpretar(pontos, numerico) {
      const letra = POR_PONTOS[chave(pontos)];
      if (!letra) return null;
      if (numerico) return DIGITOS[letra] || null;
      return letra;
    },

    pontoDaTecla(evento) { return TECLA_PONTO[evento.code] || 0; },

    // Caractere (a-z ou 0-9) digitado, em minúsculas, ou '' se for outra tecla
    caractereDaTecla(evento) {
      const k = (evento.key || '').toLowerCase();
      return /^[a-z0-9]$/.test(k) ? k : '';
    },

    // Nome do arquivo de áudio para uma tecla (ou null se não houver som gravado)
    somDaTecla(evento) {
      const codigo = codigoDaTecla(evento);
      const ehAlfaNum = (codigo >= 48 && codigo <= 57) || (codigo >= 65 && codigo <= 90);
      const ehFuncao = codigo >= 112 && codigo <= 123;
      if (ehAlfaNum || ehFuncao || SONS_EXISTENTES.has(codigo)) return 'letras/' + codigo;
      return null;
    },

    somDoCaractere(caractere) {
      return 'letras/' + caractere.toUpperCase().charCodeAt(0);
    },

    // Cria o desenho de uma cela (6 pontos); os pontos listados ficam em relevo
    criarCela(pontos, grande) {
      const cela = document.createElement('span');
      cela.className = 'cela' + (grande ? ' grande' : '');
      cela.setAttribute('aria-hidden', 'true');
      for (let n = 1; n <= 6; n++) {
        const p = document.createElement('span');
        p.className = 'p' + (pontos.indexOf(n) !== -1 ? ' on' : '');
        cela.appendChild(p);
      }
      return cela;
    }
  };
})(window.GB = window.GB || {});
