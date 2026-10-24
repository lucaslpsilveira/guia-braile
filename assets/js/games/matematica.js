/* Jogo "Matemática iniciante": soma e subtração com números de 1 a 5, falados um a um. */
(function (GB) {
  'use strict';

  const sorteio = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

  GB.iniciarJogo({
    id: 'matematica',
    rodadas: 10,
    numerico: true,
    somInicio: 'letras/introsoma',
    somAcerto: 'letras/acertou2',
    somErro: 'letras/errou',
    gerarPergunta() {
      const soma = Math.random() < 0.5;
      let a, b;
      if (soma) {
        a = sorteio(1, 5);
        b = sorteio(1, a === 5 ? 4 : 5);   // a resposta tem sempre um só dígito
      } else {
        b = sorteio(1, 4);
        a = sorteio(b + 1, 5);             // sem resultados negativos
      }
      return {
        exibir: a + (soma ? ' + ' : ' − ') + b,
        resposta: String(soma ? a + b : a - b),
        sons: [
          GB.braille.somDoCaractere(String(a)),
          soma ? 'letras/mais' : 'letras/menos',
          GB.braille.somDoCaractere(String(b))
        ]
      };
    }
  });
})(window.GB = window.GB || {});
