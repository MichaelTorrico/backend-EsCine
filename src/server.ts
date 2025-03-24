import express from 'express'
import { port } from './utils/config/EnvConfig'
import movieRouter from './movie/infrastructure/movieRouter'

const app = express()

app.use(express.json())

app.use('/movie', movieRouter)
app.get('/', (req, res) => {
  res.send('<h1>www</h1>')
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
