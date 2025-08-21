import React, { useState } from 'react';
import { Header } from './components/Header';
import { TrendingSection } from './components/TrendingSection';
import { CategorySection } from './components/CategorySection';
import { MovieGrid } from './components/MovieGrid';
import { MovieModal } from './components/MovieModal';
import { useMovies } from './hooks/useMovies';
import { useFavorites } from './hooks/useFavorites';
import { Movie } from './types/movie';

function App() {
  const [activeSection, setActiveSection] = useState('trending');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    trendingMovies,
    popularMovies,
    genres,
    moviesByGenre,
    searchResults,
    loading,
    searchLoading,
    handleSearch
  } = useMovies();
  
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-500 border-t-transparent mb-4"></div>
            <p className="text-gray-400 text-lg">Cargando catálogo de películas...</p>
          </div>
        </div>
      );
    }

    switch (activeSection) {
      case 'trending':
        return (
          <TrendingSection
            trendingMovies={trendingMovies}
            popularMovies={popularMovies}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            onMovieClick={handleMovieClick}
          />
        );
      
      case 'categories':
        return (
          <CategorySection
            genres={genres}
            moviesByGenre={moviesByGenre}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            onMovieClick={handleMovieClick}
          />
        );
      
      case 'favorites':
        return (
          <div className="min-h-[60vh]">
            {favorites.length > 0 ? (
              <MovieGrid
                title="💖 Mis Favoritos"
                movies={favorites}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
                onMovieClick={handleMovieClick}
              />
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">💔</div>
                <h2 className="text-2xl font-bold text-white mb-4">No tienes favoritos aún</h2>
                <p className="text-gray-400 text-lg">
                  Explora las películas y marca las que más te gusten como favoritas
                </p>
              </div>
            )}
          </div>
        );
      
      case 'search':
        return (
          <div className="min-h-[60vh]">
            <MovieGrid
              title={`🔍 Resultados de búsqueda`}
              movies={searchResults}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
              onMovieClick={handleMovieClick}
              loading={searchLoading}
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onSearch={handleSearch}
      />
      
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>

      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isFavorite={selectedMovie ? isFavorite(selectedMovie.id) : false}
        onToggleFavorite={toggleFavorite}
      />
      
      <footer className="bg-gray-800 border-t border-gray-700 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2025 CineCatalog. Datos proporcionados por{' '}
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-500 hover:text-amber-400 transition-colors"
              >
                The Movie Database (TMDB)
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;