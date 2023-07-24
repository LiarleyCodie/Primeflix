A funcao MovieWasFavorite() interna ao Movie.tsx esta quebrando o carregamento da pagina
assim como a instrucao:

```js
const myList: IMovies[] = JSON.parse(localStorage.getItem('@primeflix_movies') ?? '')
setMovies(myList)
```

tambem esta quebrando o carregamento da pagina Bookmarks

[] aumentar o tamanho do header na pagina movie
[] criar um efeito de paralax ao rolar a pagina
[] durante a rolagem, tornar a image do header preto e branco
[] criar uma funcao que filtre os videos obtidos da api para coletar apenas um trailer
