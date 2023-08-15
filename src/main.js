// AQUI VAMOS A CREAR LAS FUNCIONES QUE VAN A CONSUMIR LA API

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    'api_key': API_KEY,
  }
})

async function getTrendingMoviesPreview() {
  const {data} = await api(`/trending/movie/day`);
  console.log(data);

  const trendingContainer = document.querySelector('.trendingPreview-container .trendingPreview-movieList');
  const movies = data.results;
  movies.forEach(movie => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`);

    movieContainer.appendChild(movieImg);
    trendingContainer.appendChild(movieContainer);
  });
}

async function getCategoriesPreviewList() {
  const {data} = await api(`/genre/movie/list`);
  const categoriesContainer = document.querySelector('.categoriesPreview-container .categoriesPreview-list');

  const categories = data.genres;
  categories.forEach(category => {

    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', `id${category.id}`);

    const categoryTitleText = document.createTextNode(`${category.name}`);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    categoriesContainer.appendChild(categoryContainer)
  });
}

async function getMovieDetail() {

}
