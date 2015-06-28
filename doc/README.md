## Objetivo

Criar o carrinho de compras de uma loja que vende desenvolvedores baseado no exemplo fornecido.

![Imgur](http://i.imgur.com/8NPz67T.png)

Queremos descobrir seu nível de habilidade em todas as áreas envolvidas na construção de um aplicativo web: *back end*, *front end* e usabilidade.

Sinta-se confortável para focar nas áreas que você tem mais habilidade.

## Tarefas e priorização

Priorize a lista de tarefas abaixo explicando os motivos da priorização de cada uma delas. Então, escolha de duas a seis tarefas para implementar.

* Determinar o preço do desenvolvedor a partir de informações do seu perfil do GitHub, como por exemplo: followers, repos, stars, commits, etc.
* Substituir os inputs de texto por uma lista de desenvolvedores com nome, foto, preço e um botão de "Adicionar ao carrinho".
* Criar paginação para a lista de desenvolvedores.
* Popular a lista de desenvolvedores a partir de uma organização do GitHub.
* Permitir a escolha de quantidade de horas contratadas de cada desenvolvedor.
* Permitir a adição de um cupom de desconto que altera o preço total da compra. Utilize o código "SHIPIT".
* Melhorar a visualização do desenvolvedor no carrinho mostrando mais informações.
* Adicionar um botão de "comprar" que leva o usuário a uma página de pedido confirmado.

## Server side

Crie uma API REST simples que, no mínimo, utiliza uma lista em memória para guardar o estado do carrinho.

As tarefas mais avançadas exigem integração com API do GitHub. Além disso, você pode utilizar uma persistência mais robusta.

Testes automatizados são **extremamente** bem vindos.

Adoraríamos que você utilizasse [Go](https://golang.org/), [.NET](http://www.asp.net/) ou [Node](https://nodejs.org/) para construir sua API. Caso contrário, justifique sua escolha de tecnologia.

## Client side

Você pode implementar toda a interface com HTML renderizado server-side e formulários.

Uma opção melhor é criar uma _single page application_ que utilize a API REST por AJAX.

De preferência, utilize [React](https://facebook.github.io/react/). Caso deseje utilizar outras tecnologias, justifique sua escolha.

## Entrega e observações

Seu código deve estar disponível em um repositório _git_, preferencialmente hospedado no [Github](https://github.com/).

Você pode utilizar plataformas como [Heroku](https://www.heroku.com/) ou [Google Cloud Plataform](https://cloud.google.com/) para nos mostrar a aplicação funcionando em produção.

Não se preocupe se você não tem experiência em Go, Node ou React. Grande parte do nosso trabalho é lidar com novas tecnologias. Vamos levar isso em consideração.

Boa sorte!
