// AQUI VAMOS A CREAR LAS FUNCIONES QUE VAN A CONSUMIR LA API

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    'api_key': API_KEY,
    // 'language': 'es-ES',
  }
});


// Utils
const lazyLoader = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const url = entry.target.getAttribute('data-img');
      entry.target.setAttribute('src', url);
      lazyLoader.unobserve(entry.target);
    }
  })
})


function createMovies(movies, container, {
  lazyLoad = false,
  clean = true,
} = {}) {
  if (clean) {
    container.innerHTML = '';
  }

  movies.forEach(movie => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute(
      lazyLoad ? 'data-img' : 'src', 
      `https://image.tmdb.org/t/p/w300${movie.poster_path}`);

    movieImg.addEventListener('error', () => {
      movieImg.setAttribute('src', 'https://img.freepik.com/vector-premium/ops-pop-art-discurso-dibujos-animados_76844-964.jpg?w=740');
    });

    if (lazyLoad) {
      lazyLoader.observe(movieImg);
    }

    movieContainer.appendChild(movieImg);
    container.appendChild(movieContainer);

    movieContainer.addEventListener('click', () => {
      location.hash = `#movie=${movie.id}`;
    });
  });
};

function createCategories(categories, container) {
  container.innerHTML = '';
  categories.forEach(category => {
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', `id${category.id}`);
    categoryTitle.addEventListener('click', () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });

    const categoryTitleText = document.createTextNode(`${category.name}`);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer)
  });
};

function loadingMovies(container) {
  container.innerHTML = '';
  for (let i = 0; i < 10; i++) {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');
    movieContainer.classList.add('movie-container--loading');

    container.appendChild(movieContainer);
  }
}
function loadingCategories(container) {
  container.innerHTML = '';
  for (let i = 0; i < 10; i++) {
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');
    categoryContainer.classList.add('categories-container--loading');

    container.appendChild(categoryContainer);
  }
}

// Llamados a la API

async function getTrendingMoviesPreview() {
  loadingMovies(trendingPreviewMovieList);

  const {data} = await api(`/trending/movie/day`);
  console.log(`Peliculas en trending: `, data);

  const movies = data.results;
  createMovies(movies, trendingPreviewMovieList, 
    {
      lazyLoad: true, 
      clean: true
    });
}

async function getTrendingMovies() {
  loadingMovies(genericSection);
  const {data} = await api(`/trending/movie/day`);
  console.log(`Peliculas en trending: `, data);
  maxPage = data.total_pages;
  console.log(maxPage)

  const movies = data.results;
  createMovies(movies, genericSection, {
    lazyLoad: true,
    clean: true
  });
}

async function getPaginatedTrendingMovies() {
  const {scrollTop, clientHeight, scrollHeight } = document.documentElement;
  const isScrollBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
  const isNotMaxPage = page < maxPage;

  if (isScrollBottom && isNotMaxPage) {
    page++;
    const {data} = await api(`/trending/movie/day`, {
      params: {
        page,
      }
    });

    const movies = data.results;
    createMovies(movies, genericSection, {
      lazyLoad: true,
      clean: false
    });
  }
};

async function getCategoriesPreviewList() {
  loadingCategories(categoriesPreviewList);
  const {data} = await api(`/genre/movie/list`);
  
  const categories = data.genres;
  createCategories(categories, categoriesPreviewList);
};

async function getMoviesByCategory(id) {
  loadingMovies(genericSection);
  const {data} = await api(`/discover/movie`, {
    params: {
      with_genres: id,
    },
  });
  maxPage = data.total_pages;

  
  const movies = data.results;
  createMovies(movies, genericSection, {
    lazyLoad: true,
    clean: true
  });
};

async function getPaginatedCategoryMovies(id) {
  const {scrollTop, clientHeight, scrollHeight } = document.documentElement;
  const isScrollBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
  const isNotMaxPage = page < maxPage;

  if (isScrollBottom && isNotMaxPage) {
    page++;
    const {data} = await api(`/discover/movie`, {
      params: {
        with_genres: id,
        page
      },
    });

    const movies = data.results;
    createMovies(movies, genericSection, {
      lazyLoad: true,
      clean: false
    });
  }
};

async function getMoviesBySearch(query) {
  loadingMovies(genericSection);
  const {data} = await api(`/search/movie`, {
    params: {
      query,
    },
  });
  maxPage = data.total_pages;

  const movies = data.results;
  createMovies(movies, genericSection, {
    lazyLoad: true,
    clean: true
  });
};

async function getPaginatedSearchMovies(query) {
  const {scrollTop, clientHeight, scrollHeight } = document.documentElement;
  const isScrollBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
  const isNotMaxPage = page < maxPage;

  if (isScrollBottom && maxPage) {
    page++;
    const {data} = await api(`/search/movie`, {
      params: {
        query,
        page
      },
    });

    const movies = data.results;
    createMovies(movies, genericSection, {
      lazyLoad: true,
      clean: false
    });
  }
};

async function getMovieDetails(id) {
  loadingCategories(movieDetailCategoriesList)
  const {data: movie} = await api(`/movie/${id}`);
  console.log('Detalles de pelicula:', movie);
  
  headerSection.style.background = `
    linear-gradient(
    180deg, 
    rgba(0, 0, 0, 0.35) 19.27%,
    rgba(0, 0, 0, 0) 29.17%),
    url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;

  movieDetailTitle.innerText = movie.original_title;
  movieDetailScore.innerText = movie.vote_average;
  movieDetailDescription.innerText = movie.overview;
  
  createCategories(movie.genres, movieDetailCategoriesList);
  getRelatedMovies(id);
};

async function getRelatedMovies(id) {
  loadingMovies(relatedMoviesContainer);
  const {data} = await api(`https://api.themoviedb.org/3/movie/${id}/recommendations`);
  const relatedMovies = data.results.slice(0, 10);

  createMovies(relatedMovies, relatedMoviesContainer);
}
