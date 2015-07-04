DevShop Sample
========

Sistema que permite criar um carrinho de compras de uma loja virtual que vende horas de desenvolvedores. O preço das horas de desenvolvedores (produtos) é gerado à partir de uma heurística financeira que usa informações do github.

Funcionalidades:
* Adição, Listagem e Remoção de produtos no carrinho de compras
* Geração automática de preço do desenvolvedor dado pelo seguinte cálculo: repos+followers
* Finalização do carrinho de compras, através da compra.

Arquitetura
-----

O Sistema possui uma arquitetura full-stack javascript, permitindo obter os benefícios do rápido desenvolvimento, constante interação, rapidez e eficiência no uso. 

Tecnologias:
* Front-end: ReactJs(http://facebook.github.io/react/)
* Back-end: Node.Js(https://nodejs.org/)
* Banco de Dados: MongoDB(https://www.mongodb.org/)

A comunicação entre as camadas de front-end e back-end ocorre através de uma API Rest desenvolvida usando o Node.Js. Essa API é estrutura utilizando JSON.

Testes
------------

Para executar os testes unitários deve ser feito:
mocha test/products.test.js


Aplicação em Produção
------------

O ambiente de produção do sistema utiliza a plataforma Heroku (https://www.heroku.com/). O link para acessá-la é: 
https://dev-shop-sample.herokuapp.com/
