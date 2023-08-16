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
  console.log(`Peliculas en trending: `, data);

  const trendingContainer = document.querySelector('.trendingPreview-container .trendingPreview-movieList');
  trendingContainer.innerHTML = '';
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
  const showDetail = document.querySelectorAll('.movie-img');
  showDetail.forEach((item, index) => item.addEventListener('click', () => getMovieDetails(movies[index].id)));
}

async function getCategoriesPreviewList() {
  const {data} = await api(`/genre/movie/list`);

  const categoriesContainer = document.querySelector('.categoriesPreview-container .categoriesPreview-list');
  categoriesContainer.innerHTML = '';
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
};

// async function showMovieDetails(id) {
//   await getMovieDetails(id);
//   location.hash = 'movie=';
// }

async function getMovieDetails(id) {
  const {data} = await api(`/movie/${id}`, {
    params: {
      language: 'es-ES',
    },
  });
  console.log('Detalles de pelicula:', data);

  const movieTitle = document.querySelector('.movieDetail-container .movieDetail-title');
  const movieScore = document.querySelector('.movieDetail-container .movieDetail-score');
  const movieDescription = document.querySelector('.movieDetail-container .movieDetail-description');
  movieTitle.innerText = data.original_title;
  movieScore.innerText = data.vote_average;
  movieDescription.innerText = data.overview;

  const categoriesList = document.querySelector('.movieDetail-container .categories-list')
  categoriesList.innerHTML = '';
  const categorires = data.genres;
  categorires.forEach(category => {
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    const categoryTitle = document.createElement('h3');
    categoryTitle.setAttribute('id', `id${category.id}`)
    categoryTitle.classList.add('category-title');

    const categoryTitleText = document.createTextNode(`${category.name}`);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    categoriesList.appendChild(categoryContainer);
  });

  location.hash = '#movie=';
};
