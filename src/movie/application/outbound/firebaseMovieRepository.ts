import { db } from '../../../utils/db/firebase'
import { Movie, MovieRepository, UpdateMovie } from '../../domain/movie'

export default class FireBaseMovieRepository implements MovieRepository {
  async saveMovie (movie: Movie): Promise<void> {
    const movieRef = db.collection('movies').doc()
    await movieRef.set(movie)
  }

  async getMovieById (id: string): Promise<Movie | null> {
    const doc = await db.collection('movies').doc(id).get()
    if (!doc.exists) {
      return null
    }
    return doc.data() as Movie
  }

  async updateMovie (data: UpdateMovie): Promise<Movie> {
    const movieRef = db.collection('movies').doc(data._uuid)
    await movieRef.update(data)
    const updatedMovieDoc = await movieRef.get()
    return updatedMovieDoc.data() as Movie
  }

  async deleteMovie (id: string): Promise<void> {
    await db.collection('movies').doc(id).delete()
  }
}
