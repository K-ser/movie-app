// AQUI VAMOS A CREAR FUNCIONES QUE MANEJEN LA LOGICA DE NAVEGACION ENTRE PAGINAS

arrowBtn.addEventListener('click', () => {
  // location.hash = '#home';
  history.back();
});

searchFormBtn.addEventListener('click', () => {
  location.hash = `#search=${searchFormInput.value}`;
});

trendingBtn.addEventListener('click', () => {
  location.hash = '#trends';
});

window.addEventListener('DOMContentLoaded', navigator, false);
// window.addEventListener('DOMContentLoaded', () => location.hash = 'home', false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
  const HASHES = {
    '#home': () => homePage(),
    '#trends': () => trendingPage(),
    '#category=': () => categoriesPage(),
    '#search=': () => searchPage(),
    '#movie=': () => movieDetailPage(),
  };
  
  for (let key in HASHES) {
    if (location.hash.startsWith(key)) {
      HASHES[key]();
      window.scroll(0, 0);
      return;
    };
  };
};

function homePage() {
  console.log('HOME');

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.add('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.remove('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive')

  trendingPreviewSection.classList.remove('inactive');
  categoriesPreviewSection.classList.remove('inactive');  
  genericSection.classList.add('inactive');
  movieDetailSection.classList.add('inactive');  
  
  getTrendingMoviesPreview();
  getCategoriesPreviewList();
};

function trendingPage() {
  console.log('TRENDS');

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive')

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');  
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive'); 

  headerCategoryTitle.innerText = 'Tendencias';
  getTrendingMovies();
};

function categoriesPage() {
  console.log('CATEGORY');

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive')

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');  
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  const [_, completeHash] = location.hash.split('=');
  const [id, name] = completeHash.split('-');
  const nameToShow = name.replaceAll('%20', ' ');
  headerCategoryTitle.innerText = nameToShow;

  getMoviesByCategory(id, name);
};

function searchPage() {
  console.log('SEARCH');

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive')

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');  
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  const [_, name] = location.hash.split('=');
  const query = name.replaceAll('%20', ' ');
  headerCategoryTitle.innerText = query;
  getMoviesBySearch(query);
};

function movieDetailPage() {
  console.log('MOVIE');

  headerSection.classList.add('header-container--long');
  // headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.add('inactive')

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');  
  genericSection.classList.add('inactive');
  movieDetailSection.classList.remove('inactive'); 
  
  const [_, movieId] = location.hash.split('=');

  getMovieDetails(movieId);
};