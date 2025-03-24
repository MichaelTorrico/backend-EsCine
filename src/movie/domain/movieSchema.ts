import { SafeParseReturnType, z } from 'zod'
import { Genre } from './enum'

const movieSchema = z.object({
  _uuid: z
    .string({
      invalid_type_error: '_uuid must be string',
      required_error: '_uuid is required'
    })
    .nonempty('_uuid cannot be empty')
    .trim(),

  title: z
    .string({
      invalid_type_error: 'title must be string',
      required_error: 'title is required'
    })
    .nonempty('title cannot be empty')
    .max(100, 'title is too long (max 100 characters)'),

  overview: z
    .string({
      invalid_type_error: 'overview must be string',
      required_error: 'overview is required'
    })
    .max(300, 'overview is too long (max 300 characters)'),

  release_date: z
    .string({
      invalid_type_error: 'release date must be a string',
      required_error: 'release date is required'
    })
    .nonempty('release date cannot be empty')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'release date must be in YYYY-MM-DD format'),

  genre: z
    .array(
      z.nativeEnum(Genre, {
        errorMap: () => ({ message: 'genre must be a valid genre from the Genre enum' })
      })
    )
    .min(1, 'at least one genre is required'),

  poster_path: z
    .string({
      invalid_type_error: 'poster_path must be string',
      required_error: 'poster_path is required'
    })
    .nonempty('poster_path cannot be empty')
    .url('poster_path must be a valid URL'),

  backdrop_path: z
    .string({
      invalid_type_error: 'backdrop_path must be string',
      required_error: 'backdrop_path is required'
    })
    .nonempty('backdrop_path cannot be empty')
    .url('backdrop_path must be a valid URL')
})

const partialMovieSchema = movieSchema.partial()

const createMovieSchema = movieSchema.omit({
  _uuid: true
})

export function validMovie (input: unknown): SafeParseReturnType<unknown, z.infer<typeof movieSchema>> {
  return movieSchema.safeParse(input)
}

export function validPartialMovie (input: unknown): SafeParseReturnType<unknown, z.infer<typeof partialMovieSchema>> {
  return partialMovieSchema.safeParse(input)
}

export function validNewMovie (input: unknown): SafeParseReturnType<unknown, z.infer<typeof createMovieSchema>> {
  return createMovieSchema.safeParse(input)
}
