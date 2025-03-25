import { Request, Response } from 'express'
import { validNewMovie, validPartialMovie } from '../domain/movieSchema'
import { addMovieUseCase } from '../application/inbound/addMovieUseCase'
import { getMovieByIdUseCase } from '../application/inbound/getMovieByIdUseCase'
import { editMovieUseCase } from '../application/inbound/editMovieUseCase'
import { deleteMovieUseCase } from '../application/inbound/deleteMovieUseCase'
import { getAllMoviesUseCase } from '../application/inbound/getAllMoviesUseCase'

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

      if (!response.success) {
        res
          .status(500)
          .json({ error: response.error })
        return
      }
      res
        .status(200)
        .json({ movie: response.movie })
    } catch (err) {
      console.log(err)
      res
        .status(500)
        .json({ error: 'Internal Server Error' })
    }
  }

  getMovie = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    try {
      const response = await getMovieByIdUseCase(id)

      if (!response.success) {
        res
          .status(500)
          .json({ error: response.error })
        return
      }
      res
        .status(201)
        .json({ movie: response.movie })
    } catch (err) {
      console.log(err)
      res
        .status(500)
        .json({ error: 'Internal Server Error' })
    }
  }

  editMovie = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    const data = req.body

    try {
      if (typeof id !== 'string') {
        res.status(400).json({ error: 'Invalid ID' })
        return
      }

      const result = validPartialMovie(data)

      if (!result.success) {
        res.status(400).send({ error: 'Bad request' })
        return
      }

      const response = await editMovieUseCase(result.data, id)

      if (!response.success) {
        res
          .status(500)
          .json({ error: response.error })
        return
      }
      res
        .status(200)
        .json({ movie: response.movie })
    } catch (err) {
      console.log(err)
      res
        .status(500)
        .json({ error: 'Internal Server Error' })
    }
  }

  deleteMovie = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    try {
      const response = await deleteMovieUseCase(id)

      if (!response.success) {
        res
          .status(500)
          .json({ error: response.error })
        return
      }
      res
        .status(201)
        .json({ succes: response.success })
    } catch (err) {
      console.log(err)
      res
        .status(500)
        .json({ error: 'Internal Server Error' }).json({ error: 'Internal Server Error' })
    }
  }

  getAllMovies = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await getAllMoviesUseCase()

      res
        .status(200)
        .json({ result })
    } catch (err) {
      res
        .status(500)
        .json({ error: 'Internal Server Error' })
    }
  }
}
