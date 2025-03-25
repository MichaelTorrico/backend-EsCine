import { MovieUseCase, UpdateMovie } from '../../domain/movie'
import MovieRepository from '../outbound/firebaseMovieRepository'

const movieRepository = new MovieRepository()

export const editMovieUseCase = async (setData: UpdateMovie, id: string): Promise<MovieUseCase> => {
  try {
    const response = await movieRepository.updateMovie(setData, id)

    if (response === null) return { success: true, movie: null, error: 'not found' }

    return { success: true, movie: response, error: null }
  } catch (err) {
    return { success: false, movie: null, error: 'Unknown error occurred' }
  }
}
