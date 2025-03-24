import { Router } from 'express'
import { MovieController } from './movieController'

const router = Router()
const movieController = new MovieController()

router.get('/:id', movieController.getMovieById)
router.post('/', movieController.addMovie)
router.put('/:id', movieController.editMovie)
router.delete('/:id', movieController.deleteMovie)

router.get('/', movieController.getAllMovies)

export default router
