import { Movie } from '@/components/MovieCard';

const API_KEY = '6567ef93';
const BASE_URL = 'https://www.omdbapi.com/';

export interface SearchResponse {
  Search?: Movie[];
  totalResults?: string;
  Response: string;
  Error?: string;
}

export const movieService = {
  async searchMovies(query: string, page: number = 1): Promise<SearchResponse> {
    try {
      const response = await fetch(
        `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}&type=movie`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching movies:', error);
      return { Response: 'False', Error: 'Network error' };
    }
  },

  async getMovieDetails(imdbID: string): Promise<Movie | null> {
    try {
      const response = await fetch(
        `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`
      );
      const data = await response.json();
      return data.Response === 'True' ? data : null;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return null;
    }
  },

  // Mock popular movies for initial display
  getPopularMovies(): Promise<SearchResponse> {
    const popularQueries = ['Avengers', 'Batman', 'Star Wars', 'Spider-Man', 'Lord of the Rings'];
    const randomQuery = popularQueries[Math.floor(Math.random() * popularQueries.length)];
    return this.searchMovies(randomQuery);
  }
};