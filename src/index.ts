import express from 'express'
import dotenv from 'dotenv'
import type { DRequest } from './types'
import { jwt } from './middlewares/jwt'
import { generateJwtRoute } from './routes/jwt'
import { getPort } from './helpers/envHelper'
import { sendSuccessResponse } from './helpers/respHelper'
import { logger } from './logs'
import { initSocket } from './wss'

dotenv.config()

const app = express()
const router = express.Router()

app.use(express.static('public'))
app.use(express.json())

app.all('*', (_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})

router.get('/test', async (req, res) => {
  // 获取请求参数
  const { _ } = req.query
  sendSuccessResponse(res)
})

router.post('/validate', ...jwt(), (req: DRequest, resp) => {
  sendSuccessResponse(resp, { admin: req.auth.admin })
})

router.post('/auth', generateJwtRoute)

router.post('/prompt-process', async (req, res) => {
  // 设置返回头
  res.setHeader('Content-type', 'application/octet-stream')

  // 获取请求参数
  const { _ } = req.body

  try {
    res.write('[]')
  }
  catch (error) {
    res.write(JSON.stringify(error))
  }
  finally {
    res.end()
  }
})

// 初始化 socket

// app.use('', router)
app.use('/api', router)

const port = getPort()

const serve = initSocket(app)

serve.listen(port, () => logger.info(`Server is running on port ${port}`))
