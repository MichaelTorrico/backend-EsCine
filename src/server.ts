import express from 'express'
import { port } from './utils/config/EnvConfig'
import movieRouter from './movie/infrastructure/movieRouter'
import productRouter from './product/infrastructure/productRouter'
const app = express()

app.use(express.json())

app.use('/movie', movieRouter)
app.use('/product', productRouter)

app.get('/', (req, res) => {
  res.send('<h1>www</h1>')
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
