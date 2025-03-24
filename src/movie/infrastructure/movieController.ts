import { Request, Response } from 'express'
import { validNewMovie, validPartialMovie } from '../domain/movieSchema'
import { addMovieUseCase } from '../application/inbound/addMovieUseCase'

export class MovieController {
  addMovie = async (req: Request, res: Response): Promise<void> => {
    const data = req.body

    try {
      const result = validNewMovie(data)

      if (!result.success) {
        res.status(400).send({ error: 'Bad request' })
        return
      }

      const response = await addMovieUseCase(result.data)

      if (response.success) {
        res.status(201).json({ movie: response.movie })
      } else {
        res.status(500).json({ error: response.error })
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({ error: 'Internal Server Error' })
    }
  }

  getMovieById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.query
    try {
      if (id === undefined) {
        res.status(404)
        return
      }

      res.status(200)
    } catch (error) {
      console.log(error)
    }
  }

  editMovie = async (_req: Request, _res: Response): Promise<void> => {

  }

  deleteMovie = async (_req: Request, _res: Response): Promise<void> => {

  }

  getAllMovies = async (req: Request, res: Response): Promise<void> => {
    const { params } = req.query
    try {
      const result = validPartialMovie(params)

      res.status(200).json({ result })
    } catch (err) {
      console.log(err)
    }
  }
}
