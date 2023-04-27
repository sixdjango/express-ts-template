import express from 'express'
import dotenv from 'dotenv'
import { getPort } from './helpers/envHelper'
import { logger } from './logs'
import { initSocket } from './wss'
import { initMySQL } from './db/mysql'
import { setupRoutes } from './routes'

dotenv.config()

const app = express()

app.use(express.static('public'))
app.use(express.json())

app.all('*', (_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})

const _ = setupRoutes(app)

const port = getPort()

initMySQL()
const serve = initSocket(app)

serve.listen(port, () => logger.info(`Server is running on port ${port}`))
