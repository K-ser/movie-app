const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280';

export const getImageUrl = (path: string | null): string => {
  if (!path) return '/placeholder-movie.jpg';
  return `${IMAGE_BASE_URL}${path}`;
};

export const getBackdropUrl = (path: string | null): string => {
  if (!path) return '/placeholder-backdrop.jpg';
  return `${BACKDROP_BASE_URL}${path}`;
};

export const fetchTrendingMovies = async () => {
  const response = await fetch(`${API_BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
  if (!response.ok) throw new Error('Error fetching trending movies');
  return response.json();
};

export const fetchPopularMovies = async () => {
  const response = await fetch(`${API_BASE_URL}/movie/popular?api_key=${API_KEY}`);
  if (!response.ok) throw new Error('Error fetching popular movies');
  return response.json();
};

export const fetchMoviesByGenre = async (genreId: number) => {
  const response = await fetch(`${API_BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
  if (!response.ok) throw new Error('Error fetching movies by genre');
  return response.json();
};

export const fetchGenres = async () => {
  const response = await fetch(`${API_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  if (!response.ok) throw new Error('Error fetching genres');
  return response.json();
};

export const searchMovies = async (query: string) => {
  if (!query.trim()) return { results: [] };
  const response = await fetch(`${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('Error searching movies');
  return response.json();
};