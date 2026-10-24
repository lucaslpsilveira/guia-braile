/* Jogo "Adivinhe a Letra": o sistema sorteia e fala uma letra; o jogador responde em Braille. */
(function (GB) {
  'use strict';

  const ALFABETO = 'abcdefghijklmnopqrstuvwxyz'.split('');

  GB.iniciarJogo({
    id: 'adivinha-letra',
    rodadas: 10,
    numerico: false,
    somInicio: 'letras/comecoletras',
    somAcerto: 'letras/asterisco',
    somErro: 'letras/arroba',
    gerarPergunta() {
      const letra = ALFABETO[Math.floor(Math.random() * ALFABETO.length)];
      return {
        exibir: letra.toUpperCase(),
        resposta: letra,
        sons: [GB.braille.somDoCaractere(letra)]
      };
    }
  });
})(window.GB = window.GB || {});
