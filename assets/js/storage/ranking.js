/*
 * Ranking guardado no navegador (localStorage), um por jogo.
 * Substitui o antigo ranking.php, que gravava em arquivo texto no servidor.
 */
(function (GB) {
  'use strict';

  const LIMITE = 10;
  const chave = jogo => 'gb-ranking-' + jogo;

  function listar(jogo) {
    try {
      const dados = JSON.parse(GB.store.get(chave(jogo)) || '[]');
      return Array.isArray(dados) ? dados : [];
    } catch (e) {
      return [];
    }
  }

  GB.ranking = {
    listar,

    salvar(jogo, nome, pontos) {
      const limpo = String(nome || '').trim().slice(0, 20) || 'Anônimo';
      const lista = listar(jogo);
      lista.push({ nome: limpo, pontos: Number(pontos) || 0, data: Date.now() });
      lista.sort((a, b) => b.pontos - a.pontos || a.data - b.data);
      GB.store.set(chave(jogo), JSON.stringify(lista.slice(0, LIMITE)));
    },

    // Desenha o ranking dentro de uma <ol>
    desenhar(jogo, ol) {
      ol.textContent = '';
      const lista = listar(jogo);
      if (!lista.length) {
        const vazio = document.createElement('li');
        vazio.textContent = 'Ainda não há pontuações.';
        ol.appendChild(vazio);
        return;
      }
      lista.forEach(item => {
        const li = document.createElement('li');
        const nome = document.createElement('span');
        nome.className = 'nome';
        nome.textContent = item.nome;
        const pts = document.createElement('span');
        pts.className = 'pts';
        pts.textContent = item.pontos + ' pts';
        li.append(nome, pts);
        ol.appendChild(li);
      });
    }
  };
})(window.GB = window.GB || {});
