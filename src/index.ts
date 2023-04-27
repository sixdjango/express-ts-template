import express from 'express'
import * as dotenv from 'dotenv-flow'
import { getPort } from './helpers/envHelper'
import { setupLogger } from './logs'
import { initSocket } from './wss'
import { setupRoutes } from './routes'
import { initPrisma } from './db/prisma'

// 加载环境变量
dotenv.config()

// 初始化日志并挂载到全局
setupLogger()

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

initPrisma()
const serve = initSocket(app)

serve.listen(port, () => logger.info(`Server is running on port ${port}`))
