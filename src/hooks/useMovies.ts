import { useState, useEffect } from 'react';
import { Movie, Genre } from '../types/movie';
import { fetchTrendingMovies, fetchPopularMovies, fetchMoviesByGenre, fetchGenres, searchMovies } from '../services/movieAPI';

export const useMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [moviesByGenre, setMoviesByGenre] = useState<{ [key: number]: Movie[] }>({});
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [trendingResponse, popularResponse, genresResponse] = await Promise.all([
          fetchTrendingMovies(),
          fetchPopularMovies(),
          fetchGenres()
        ]);

        setTrendingMovies(trendingResponse.results);
        setPopularMovies(popularResponse.results);
        setGenres(genresResponse.genres);

        // Load movies for popular genres
        const popularGenreIds = [28, 35, 18, 27, 878, 53]; // Action, Comedy, Drama, Horror, Sci-Fi, Thriller
        const genreMovies: { [key: number]: Movie[] } = {};

        for (const genreId of popularGenreIds) {
          const response = await fetchMoviesByGenre(genreId);
          genreMovies[genreId] = response.results.slice(0, 10);
        }

        setMoviesByGenre(genreMovies);
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    try {
      const response = await searchMovies(query);
      setSearchResults(response.results);
    } catch (error) {
      console.error('Error searching movies:', error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  return {
    trendingMovies,
    popularMovies,
    genres,
    moviesByGenre,
    searchResults,
    loading,
    searchLoading,
    handleSearch
  };
};