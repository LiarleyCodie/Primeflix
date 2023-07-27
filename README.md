# Primeflix 🎬

Primeflix é um projeto originado de um curso da Udemy, com o diferencial de ter sido desenvolvido utilizando TypeScript para implementar todos os componentes e Styled Components em vez de arquivos CSS externos.

## Descrição 📝

O projeto Primeflix é um catálogo de filmes que apresenta inicialmente os filmes lançados (ou prestes a serem lançados). Ao posicionar o cursor sobre um filme, serão exibidas algumas informações sobre ele. Se você clicar em "Read more...", será redirecionado para uma página com ainda mais detalhes sobre o filme e o trailer disponível. Você também pode adicionar ou remover filmes aos favoritos e acessá-los através da barra de navegação superior.

O catálogo de filmes é obtido através da API do [TheMoviesDB](https://www.themoviedb.org/).

## Funcionalidades ✨

- Visualizar informações dos filmes.
- Ver trailers dos filmes selecionados.
- Adicionar e remover filmes aos favoritos.
- Acessar a página com seus filmes favoritos.
- Interface responsiva para as resoluções de 320px e 1024px.

## Instalação e Execução 🚀

Para instalar as dependências, utilize o gerenciador de pacotes [Yarn](https://yarnpkg.com/):

```
yarn install
```

Para executar o projeto localmente:

```
yarn dev
```

## Módulos Utilizados 🛠️

- `styled-components`: Biblioteca para estilizar os componentes utilizando templates literais em JavaScript.
- `ReactJS (Vite + TS)`: Utilizado como base para desenvolvimento da aplicação.
- `phosphoricons`: Conjunto de ícones utilizados na interface.
- `axios`: Biblioteca para realizar requisições HTTP à API do TheMoviesDB.
- `react-router-dom`: Gerenciador de rotas para a navegação dentro da aplicação.

## Problemas Conhecidos 🐞

- O player incorporado do YouTube pode não carregar corretamente devido a restrições de requisição em produção. Uma solução está em consideração.
- Ao adicionar ou remover um filme dos favoritos, o estado do botão pode não ser atualizado corretamente. Isso ocorre ao voltar à página do filme após ter adicionado ou removido da lista de favoritos.
- Rota inválida resulta em uma quebra na aplicação em vez de exibir uma página de erro 404.

## Deploy 🌐

O projeto está hospedado no Netlify. Confira você mesmo: [Primeflix](https://lyiar-primeflix.netlify.app/)
