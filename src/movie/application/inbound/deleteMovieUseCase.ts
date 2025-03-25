import { MovieUseCase } from '../../domain/movie'
import MovieRepository from '../outbound/firebaseMovieRepository'

const movieRepository = new MovieRepository()

export const deleteMovieUseCase = async (id: string): Promise<MovieUseCase> => {
  try {
    const response = await movieRepository.deleteMovie(id)

    if (!response) return { success: false, movie: null, error: 'movie not found' }

    return { success: true, movie: null, error: null }
  } catch (err) {
    return { success: false, movie: null, error: 'Unknown error occurred' }
  }
}
