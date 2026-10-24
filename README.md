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
| [index.html](index.html) | Página inicial, com slideshow e narração em áudio. |
| [pages/projeto.html](pages/projeto.html) | Apresentação do projeto. |
| [pages/braille.html](pages/braille.html) | História e funcionamento do Braille, área de prática e o alfabeto em Braille. |
| [pages/jogos.html](pages/jogos.html) | Menu de jogos. |
| [pages/adivinha-letra.html](pages/adivinha-letra.html) | **Adivinhe a Letra**: o sistema fala uma letra e o jogador responde. São 10 rodadas. |
| [pages/matematica.html](pages/matematica.html) | **Matemática iniciante**: somas e subtrações com números de 1 a 5, faladas em áudio. |
| [pages/teclado.html](pages/teclado.html) | **Faça seu teclado**: tutorial em 5 etapas para adaptar um teclado comum ao Braille. |

Vários jogos aparecem no menu como "em breve". A proposta previa expandir o sistema periodicamente com novos jogos interativos.

### Acessibilidade

- Todas as páginas têm **áudios narrados** (pasta [assets/audio/](assets/audio/)), tocados ao focar um elemento com a tecla Tab e pelos botões "Ouvir esta explicação". A narração pode ser desligada no cabeçalho.
- Navegação completa pelo teclado, com foco visível, link "Pular para o conteúdo", HTML semântico e anúncios por `aria-live` para leitores de tela.
- Os jogos dão retorno sonoro de acerto e erro (e vibração no celular).

### Como jogar

- **Adivinhe a Letra:** pressione **Enter** para começar. O sistema fala uma letra e você responde pressionando a tecla correspondente no teclado adaptado. São 10 rodadas.
- **Matemática iniciante:** pressione **F2** para começar. O sistema fala a conta, e você digita o resultado e confirma.

Os jogos usam o teclado físico, como na versão original de 2014. Só o layout foi adaptado para telas pequenas.

## Tecnologias

HTML, CSS e JavaScript puros, sem frameworks, sem etapa de build e sem back-end:

- CSS com variáveis, Flexbox/Grid e abordagem mobile-first
- JavaScript em arquivos simples, sem módulos ES, para funcionar até abrindo os arquivos direto no navegador
- Áudios em MP3 reproduzidos com a API `Audio`
- Imagens em WebP

## Estrutura de pastas

```
.
├── index.html
├── pages/                  # projeto, braille, jogos, teclado e os jogos
└── assets/
    ├── css/                # base, layout, components, games (importados por main.css)
    ├── js/
    │   ├── core/           # audio.js e braille.js (alfabeto, teclas)
    │   ├── ui/             # layout, slideshow e teclado Braille de 6 pontos (página Braille)
    │   ├── games/          # lógica de cada jogo (original de 2014)
    │   └── pages/          # scripts específicos de páginas
    ├── img/
    └── audio/              # menu/, paginas/ e letras/
```

## Como executar

Não precisa de instalação. Sirva a pasta com qualquer servidor estático:

```bash
python3 -m http.server 8000
# ou
npx serve .
```

e abra `http://localhost:8000/`. Abrir o `index.html` direto no navegador também funciona.

> **Observação:** navegadores bloqueiam áudio antes da primeira interação. Por isso a narração de abertura começa no primeiro toque ou tecla pressionada.

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
