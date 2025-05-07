import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { page = 1, genre, query } = req.query;
    
    const response = await axios.get('https://api.tuapi.com/3/discover/movie', {
      params: {
        api_key: process.env.TMDB_API_KEY,
        page,
        with_genres: genre,
        query
      }
    });

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
}