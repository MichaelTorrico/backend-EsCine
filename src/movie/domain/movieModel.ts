import { Movie, NewMovie } from './movie'

export const processNewMovieData = (data: NewMovie, id: string): Movie => {
  return {
    _uuid: id,
    title: data.title,
    overview: data.overview,
    release_date: data.release_date,
    genre: data.genre,
    poster_path: data.poster_path,
    backdrop_path: data.backdrop_path,
    isDeleted: false
  }
}
