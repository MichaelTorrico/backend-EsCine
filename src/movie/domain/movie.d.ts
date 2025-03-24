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

export type UpdateMovie = Partial<Omit<Movie, '_uuid' | 'isDeleted'>> & { _uuid: string, isDeleted: boolean }

export interface MovieUseCase {
  success: boolean
  movie?: Movie
  error?: string
}

export interface MovieRepository {
  saveMovie: (movie: Movie) => Promise<void>
  getMovieById: (id: string) => Promise<Movie | null>
  updateMovie: (data: UpdateMovie) => Promise <Movie>
  deleteMovie: (id: string) => Promise<void>
}
