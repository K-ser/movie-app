// AQUI VAMOS A CREAR FUNCIONES QUE MANEJEN LA LOGICA DE NAVEGACION ENTRE PAGINAS

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
  if(location.hash.startsWith('#trends')) {
    trendingPage();
  } else if (location.hash.startsWith('#search')) {
    searchPage();
  } else if (location.hash.startsWith('#movie=')) {
    movieDetailPage();
  } else if (location.hash.startsWith('#category=')) {
    categoriesPage();
  } else if (location.hash.startsWith('#home')) {
    homePage();
  } else {
    alert('La pagina solicitada no se encuentra');
  }
}

function homePage() {
  getTrendingMoviesPreview();
  getCategoriesPreviewList();
}

function trendingPage() {
  console.log('TRENDS')
}

function searchPage() {

}

function movieDetailPage() {

}

function categoriesPage() {

}