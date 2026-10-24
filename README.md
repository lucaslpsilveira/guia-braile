# Guia Braille

**Sistema para auxílio do deficiente visual no aprendizado de Braille.**

Projeto desenvolvido em 2014 no **Instituto Federal Sul-rio-grandense – Campus Charqueadas (IFSul)**.

| | |
|---|---|
| **Integrantes** | José Felipe Rodrigues Serpa<br>Pietro de Almeida Lopes<br>Lucas Pedreira da Silveira |
| **Orientador** | Prof. Dr. Mauricio Escobar |

---

## Sobre o projeto

O Guia Braille é um sistema web de ensino do sistema Braille voltado **especificamente para pessoas com deficiência visual**. Em vez de depender apenas da leitura visual ou de professores especializados, o site usa **instruções sonoras** e **interação pelo teclado** para que o usuário aprenda de forma dinâmica e autônoma, explorando a audição e o tato.

O sistema explica os principais conceitos da simbologia Braille e propõe exercícios práticos (jogos) para fixar o conteúdo.

## Contexto e motivação

- Segundo o IBGE (divulgado pelo G1/Globo em 2014), 23,9% dos brasileiros declaram ter alguma deficiência. A deficiência visual é a mais relatada: 35,7 milhões de pessoas, das quais 6,5 milhões têm dificuldade severa de enxergar e mais de 506 mil são cegas.
- O Braille é um código universal de leitura e escrita tátil, formado por seis pontos em relevo dispostos em duas colunas, com 63 sinais possíveis. Ele é usado em literatura e na simbologia matemática e científica.
- O aprendizado tradicional consiste em decorar padrões de pontos usando só o tato. É um processo lento e, às vezes, cansativo, e faltam professores qualificados.
- Segundo a Federação Nacional dos Cegos dos Estados Unidos, apenas cerca de 10% das crianças cegas americanas sabem Braille.
- Os softwares de ensino de Braille que existiam na época (como o *Aprendibraille* e o *Braille Virtual*) eram voltados a pessoas **sem** deficiência visual ou com baixa visão. Isso deixava sem atendimento quem mais precisa: as pessoas cegas.

**Pergunta de pesquisa:** um software de ensino de Braille desenvolvido especificamente para deficientes visuais pode contribuir para aumentar o índice de alfabetização na simbologia?

## Objetivos

**Geral:** desenvolver um ambiente web para auxiliar o deficiente visual no aprendizado de Braille.

**Específicos:**

1. Estudar a simbologia Braille.
2. Desenvolver um sistema web de ensino usando HTML, CSS e JavaScript.
3. Adaptar o ambiente para deficientes visuais por meio de instruções sonoras.
4. Criar um tutorial para adaptar um teclado comum à simbologia Braille.
5. Realizar testes para avaliar os resultados.

## Funcionalidades

| Página | Descrição |
|---|---|
| [index.html](index.html) | Página inicial, com menu e narração em áudio. |
| [projeto.html](projeto.html) | Apresentação do projeto. |
| [braille.html](braille.html) | Contextualização do Braille: história, como funciona e a simbologia. |
| [jogo.html](jogo.html) | Menu de jogos em Braille. |
| [adivinhaLetra.html](adivinhaLetra.html) / [adivinhaLetra.php](adivinhaLetra.php) | **Adivinhe a Letra**: o sistema fala uma letra e o usuário deve digitá-la no teclado. São 10 rodadas, e a pontuação é enviada para o ranking. |
| [conta.html](conta.html) / [conta2.html](conta2.html) | **Matemática iniciante**: exercícios de contas com letras e números e retorno por áudio. |
| [ranking.php](ranking.php) | Registra o nome do jogador e a pontuação em [arquivo.txt](arquivo.txt). |
| [teclado.html](teclado.html) | **Faça seu teclado**: tutorial em 5 etapas para adaptar um teclado comum ao Braille. |
| [palavra.html](palavra.html), [relogio.html](relogio.html) | Protótipos e experimentos. |

Vários jogos aparecem no menu como "em construção". A proposta previa expandir o sistema periodicamente com novos jogos interativos.

### Acessibilidade

- Todas as páginas têm **áudios narrados** (pasta [audio/](audio/)), disparados pelo foco nos itens do menu ou pelo teclado.
- Cada tecla pressionada emite o som da letra correspondente. O arquivo de áudio é escolhido pelo `keyCode` da tecla (ver [js/functions.js](js/functions.js)).
- Os jogos dão retorno sonoro de acerto e erro.
- Não é preciso usar o mouse: a interação é feita pelo teclado.

## Tecnologias

- **HTML**, **CSS** e **JavaScript** (estrutura, estilo e lógica)
- **jQuery** e **jQuery Cycle** (slideshow da página inicial)
- **Bootstrap** (layout)
- **PHP** (apenas para o ranking e a versão PHP do jogo)
- Áudios em **MP3**, reproduzidos com a tag `<embed>`

## Estrutura de pastas

```
.
├── index.html, projeto.html, braille.html,
│   jogo.html, teclado.html      # Páginas principais
├── adivinhaLetra.html/.php      # Jogo "Adivinhe a Letra"
├── conta.html, conta2.html      # Jogo de matemática
├── ranking.php, arquivo.txt     # Ranking (gravado em arquivo texto)
├── audio/                       # Narrações e sons das letras
├── img/                         # Imagens e slides
├── css/                         # Estilos (dvgame.css)
├── js/                          # jQuery, slideshow e funções de áudio
└── bootstrap/                   # Framework de layout
```

## Como executar

1. Coloque a pasta em um servidor web com PHP, como Apache ou o servidor embutido do PHP:

   ```bash
   php -S localhost:8000
   ```

2. Abra `http://localhost:8000/` no navegador.

As páginas estáticas funcionam abrindo os arquivos HTML diretamente. O ranking e a versão PHP do jogo exigem PHP com permissão de escrita em `arquivo.txt`.

> **Observação:** o projeto é de 2014 e depende da tag `<embed>` e de `keyCode` para tocar o áudio. Navegadores modernos podem bloquear a reprodução automática ou não reproduzir os sons corretamente.

## Metodologia

1. Pesquisa bibliográfica sobre deficiência visual e o sistema Braille.
2. Desenvolvimento do site e, em paralelo, adaptação de um teclado comum para Braille, com tutorial.
3. Testes funcionais.
4. Manutenção e expansão com novos jogos interativos.

## Referências

- ABDALA, N. *Concepções de Leitura e de Escrita*.
- BRAILLE VIRTUAL. *Para aprender Braille na Internet*. <http://www.braillevirtual.fe.usp.br/pt/index.html>
- D'OARK, H. *Aprendibraille – Software de Auxílio a Portadores de Baixa Visão*.
- DORINA. *Nos EUA a maioria das crianças cegas não sabe ler o Braille*. <http://www.fundacaodorina.org.br/blog/2010/02/nos-eua-maioria-das-criancas-cegas-nao-sabe-ler-braille/>
- GLOBO. *23,9% dos brasileiros declaram ter alguma deficiência, diz IBGE*. <http://g1.globo.com/brasil/noticia/2012/04/239-dos-brasileiros-declaram-ter-alguma-deficiencia-diz-ibge.html>
- GONÇALVES, J.C.S.; FERREIRA, H.M. *Deficiência visual: desafios de uma alfabetização em Braille*.
- GUTJALER, N.I.S. *Estratégias do ensino de Alfabetização*.
- IBC. *A Criança Deficiente Visual e seus Pais*. <http://www.ibc.gov.br/?itemid=107>
- IBC. *O Sistema Braille*. <http://www.ibc.gov.br/?itemid=477>
- SCHMIDT, M. B. *Proposta de Solução Integrada para a Leitura em Braille*. Itajaí, SC, 2013.

---

Instituto Federal Sul-rio-grandense · Campus Charqueadas · 2014
