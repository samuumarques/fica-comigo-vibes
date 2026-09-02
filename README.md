# Fica Comigo App

Quero criar o ficaComigo, um site onde alguém envia uma mensagem de interesse romântico

pra outra pessoa (texto, áudio, interesses em comum), e quem recebe decide responder

clicando em "FICA COMIGO" ou "RALA DAQUI". Público: adolescentes e universitários,

18 a 24 anos. O tom é de algo que um amigo fez pra você, nunca de produto corporativo.

--- FUNCIONALIDADE (4 telas em fluxo) ---

TELA 1 — Compor:

- Campo com o nome de quem vai receber a mensagem

- Campo de texto para a mensagem, com um filtro simples de palavras impróprias que

  mostra um aviso em tempo real se detectar algo ofensivo, bloqueando o envio até

  o texto ser corrigido

- Botão de gravar áudio (usando o microfone do navegador), com preview de playback

  depois de gravado, e um aviso de que o áudio passa por revisão de conteúdo antes

  de ficar disponível

- Seção "o que vocês têm em comum": 5 botões de categoria (Músicas, Filmes, Livros,

  Jogos, Séries). Cada botão abre um painel com campo de busca e uma lista de itens

  (pode simular com dados de exemplo por enquanto), permitindo selecionar até 5 itens

  por categoria. Os itens escolhidos aparecem como chips/tags visuais

- Botão para gerar o link da mensagem

TELA 2 — Link gerado:

- Mostra uma URL simulada (ex: ficacomigo.app/p/nome-código)

- Aviso de que na versão final o link passa por moderação antes de ativar

- Botão para visualizar como ficaria pra quem recebe, e botão para editar

TELA 3 — Visão de quem recebe:

- Mostra quem enviou, a mensagem, o áudio (se houver) e os interesses em comum

- Três ações: botão grande "FICA COMIGO", botão menor "RALA DAQUI", e um link

  discreto "prefiro não responder agora" (ignorar)

TELA 4 — Resultado:

- Mensagem diferente pra cada ação: se aceitou ("Combinou"), se recusou (deixa claro

  que quem enviou é avisado sem constrangimento, e que a mesma pessoa fica bloqueada

  de enviar novamente), ou se ignorou (nada é enviado automaticamente)

--- DIREÇÃO VISUAL: Y2K nostálgico ---

Referência direta: acessórios tech dos anos 2000 cobertos de strass/pedrinhas em tons

de rosa e roxo metálico (tipo celular flip, câmera digital, mp3 player), sobre fundo

gradiente azul-roxo-rosa com grid sutil de fundo, bolhas de sabão translúcidas

flutuando, estrelinhas/sparkles espalhadas, detalhes de corrente com pingente de

coração, textura de pompom peludo em elementos de destaque, contas coloridas tipo

pulseira da amizade formando palavras. A paleta gira em torno de rosa choque, roxo

lavanda, azul periwinkle e magenta, com brilho/glow e reflexos metálicos — não é

pastel fosco, é pastel com brilho de bijuteria.

Evite clichês de landing page gerada por IA: fundo bege + terracota, cards com sombra

cinza padrão, tudo com o mesmo border-radius, rótulos em CAIXA ALTA por decoração.

--- TIPOGRAFIA ---

- O nome "Ficacomigo" usa uma fonte display bold estilo Y2K bubble-letter: contorno

  grosso, preenchimento claro (branco/creme), sombra 3D deslocada em roxo/rosa escuro

  criando efeito de profundidade — tipo capa de CD pop ou logo de MSN Messenger dos

  anos 2000. É a assinatura visual da marca, precisa ser reconhecível sozinha, bem

  diferente do resto da tipografia do site.

- O restante do texto usa uma segunda fonte jovem e legível, sem competir com o

  logotipo, mas ainda com personalidade (nada de fonte de sistema genérica).

--- BOTÕES ---

Cada botão de ação tem tratamento visual próprio:

- "FICA COMIGO": o momento mais importante da experiência — grande, com efeito de

  brilho/glow, talvez com pedrinhas ou contorno tipo bijuteria, reagindo ao hover/toque

  com movimento próprio antes mesmo do clique

- "RALA DAQUI": visualmente oposto (mais contido), mas com personalidade própria,

  não pode parecer botão desabilitado

- "prefiro não responder agora": discreto, texto simples, claramente terciário

- Botões de categoria e o botão de gravar áudio seguem a mesma linguagem visual do

  restante do site, não o padrão de biblioteca de UI genérica

--- ANIMAÇÃO E INTERATIVIDADE ---

Quero bastante movimento, de propósito:

- Elementos reagindo continuamente a hover, foco e scroll, não só ao clique

- Efeito de confete (ou equivalente) ao clicar em "FICA COMIGO" na tela de resultado

- Som opcional em momentos-chave (enviar, receber resposta), com botão de mute visível

- Transições com personalidade entre as quatro telas, não fade genérico

- Respeitar prefers-reduced-motion para quem tiver essa preferência ativada no sistema

- Sem prejudicar performance ou usabilidade em mobile — a maioria do público acessa

  pelo celular

--- PROCESSO ---

Antes de gerar o código final, mostre a paleta de cores exata que você vai usar

(com hex codes) e a escolha de fontes (nome das fontes ou fontes do Google Fonts

equivalentes ao estilo bubble-letter descrito acima), para eu confirmar antes de você

construir a tela completa.

OBS: utilizar para o desing as duas imagens de referência do estilo pedido pelo prompt

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://fica-comigo-vibes.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d258adfd-4fad-4e2c-9333-40ba947d74bd).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
