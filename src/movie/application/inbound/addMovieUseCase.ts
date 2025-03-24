import { db } from '../../../utils/db/firebase'
import { MovieUseCase, NewMovie } from '../../domain/movie'
import { processNewMovieData } from '../../domain/movieModel'
import MovieRepository from '../outbound/firebaseMovieRepository'

const movieRepository = new MovieRepository()

export const addMovieUseCase = async (data: NewMovie): Promise<MovieUseCase> => {
  try {
    const movieId = db.collection('movies').doc().id
    const newMovie = processNewMovieData(data, movieId)

    await movieRepository.saveMovie(newMovie)

    return { success: true, movie: newMovie }
  } catch (err) {
    console.log(err)
    return { success: false }
  }
}
