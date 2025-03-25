import { MovieUseCase } from '../../domain/movie'
import MovieRepository from '../outbound/firebaseMovieRepository'

const movieRepository = new MovieRepository()

export const getAllMoviesUseCase = async (): Promise<MovieUseCase> => {
  try {
    const movie = await movieRepository.getAllMovies()

    return { success: true, movie, error: null }
  } catch (err) {
    return { success: false, movie: null, error: 'Unknown error occurred' }
  }
}
