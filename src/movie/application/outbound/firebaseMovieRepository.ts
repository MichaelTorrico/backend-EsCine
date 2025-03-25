import { db } from '../../../utils/db/firebase'
import { Movie, MovieRepository, ResMovie, UpdateMovie } from '../../domain/movie'

export default class FireBaseMovieRepository implements MovieRepository {
  async saveMovie (movie: Movie): Promise<void> {
    const movieRef = db.collection('movies').doc()
    await movieRef.set(movie)
  }

  async getMovieById (id: string): Promise<ResMovie | null> {
    const snapshot = await db
      .collection('movies')
      .where('_uuid', '==', id)
      .where('isDeleted', '==', false)
      .get()

    if (snapshot.empty) {
      return null
    }

    const doc = snapshot.docs[0]
    const movie = doc.data() as Movie

    const { isDeleted, ...resMovie } = movie

    return resMovie
  }

  async updateMovie (setData: UpdateMovie, id: string): Promise<ResMovie | null> {
    const moviesRef = db.collection('movies')

    const querySnapshot = await moviesRef
      .where('_uuid', '==', id)
      .where('isDeleted', '==', false)
      .limit(1)
      .get()

    if (querySnapshot.empty) {
      return null
    }

    const movieDoc = querySnapshot.docs[0]
    const movieRef = moviesRef.doc(movieDoc.id)
    await movieRef.update(setData)

    const updatedMovieSnapshot = await movieRef.get()

    const updatedMovie = updatedMovieSnapshot.data() as Movie

    const { isDeleted, ...ResUpdatedMovie } = updatedMovie

    return ResUpdatedMovie
  }

  async deleteMovie (id: string): Promise<boolean> {
    const moviesRef = db.collection('movies')
    const querySnapshot = await moviesRef.where('_uuid', '==', id).limit(1).get()

    if (querySnapshot.empty) return false

    const movieDoc = querySnapshot.docs[0]
    const movieRef = moviesRef.doc(movieDoc.id)

    await movieRef.update({
      isDeleted: true
    })

    return true
  }

  async getAllMovies (): Promise<ResMovie[]> {
    const allMovies = await db
      .collection('movies')
      .where('isDeleted', '==', false)
      .get()

    const resMovie: ResMovie[] = allMovies.docs.map((doc) => {
      const movie = doc.data() as Movie
      const { isDeleted, ...resMovie } = movie
      return resMovie
    })

    return resMovie
  }
}
