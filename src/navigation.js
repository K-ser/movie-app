// AQUI VAMOS A CREAR FUNCIONES QUE MANEJEN LA LOGICA DE NAVEGACION ENTRE PAGINAS

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('DOMContentLoaded', () => location.hash = 'home', false);
window.addEventListener('hashchange', navigator, false);
// const headerTitle = document.querySelector('.header-title');
// headerTitle.addEventListener('click', , false);


function navigator() {
  // if (location.hash.startsWith('#home')) {
  //   homePage();
  // } else if(location.hash.startsWith('#trends')) {
  //   trendingPage();
  // } else if (location.hash.startsWith('#search')) {
  //   searchPage();
  // } else if (location.hash.startsWith('#movie=')) {
  //   movieDetailPage();
  // } else if (location.hash.startsWith('#category=')) {
  //   categoriesPage();
  // } else {
  //   alert('La pagina solicitada no se encuentra');
  // }
  const HASHES = {
    '#home': () => homePage(),
    '#trends': () => trendingPage(),
    '#search': () => searchPage(),
    '#movie=': () => movieDetailPage(),
    '#category=': () => categoriesPage(),
  }
  HASHES[location.hash]();
}

const trendingContainer = document.querySelector('#trendingPreview');
const categoriesContainer = document.querySelector('#categoriesPreview');
const movieDetailContainer = document.querySelector('#movieDetail');

function homePage() {
  if ( trendingContainer.classList.contains('inactive')) {
    trendingContainer.classList.toggle('inactive');
    categoriesContainer.classList.toggle('inactive');
    movieDetailContainer.classList.toggle('inactive');
  }
  
  getTrendingMoviesPreview();
  getCategoriesPreviewList();
}

function trendingPage() {
  console.log('TRENDS');
}

function searchPage() {
  console.log('SEARCH');
}

function movieDetailPage() {
  console.log('MOVIE');
  
  trendingContainer.classList.toggle('inactive');
  categoriesContainer.classList.toggle('inactive');
  movieDetailContainer.classList.toggle('inactive');
}

function categoriesPage() {
  console.log('CATEGORY');

}