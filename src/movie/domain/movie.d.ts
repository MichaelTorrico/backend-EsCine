import { Genre } from './enum'

export interface Movie {
  _uuid: string
  title: string
  overview: string
  release_date: string
  genre: Genre[]
  poster_path: string
  backdrop_path: string
  isDeleted: boolean
}

export type NewMovie = Omit<Movie, '_uuid' | 'isDeleted'>

export type UpdateMovie = Partial<Omit<Movie, '_uuid' | 'isDeleted'>>

export type ResMovie = Omit<Movie, 'isDeleted'>

export interface MovieUseCase {
  success: boolean
  movie: ResMovie | null | ResMovie[]
  error: string | null
}

export interface MovieRepository {
  saveMovie: (movie: Movie) => Promise<void>
  getMovieById: (id: string) => Promise<ResMovie | null>
  updateMovie: (setData: UpdateMovie, id: string) => Promise <ResMovie | null>
  deleteMovie: (id: string) => Promise<boolean>
  getAllMovies: () => Promise<ResMovie[]>
}
