import { MovieUseCase } from '../../domain/movie'
import MovieRepository from '../outbound/firebaseMovieRepository'

const movieRepository = new MovieRepository()

export const getMovieByIdUseCase = async (id: string): Promise<MovieUseCase> => {
  try {
    const movie = await movieRepository.getMovieById(id)

    if (movie === null) return { success: false, movie, error: 'movie not found' }

    return { success: true, movie, error: null }
  } catch (err) {
    return { success: false, movie: null, error: 'Unknown error occurred' }
  }
}
