import { Router } from 'express'
import type { Application } from 'express'
import { generateJwtRoute } from './jwt'
import { sendSuccessResponse } from '@/helpers/respHelper'
import { jwt } from '@/middlewares/jwt'
import type { DRequest } from '@/types/common'

export const setupRoutes = (app: Application) => {
  const router = Router()

  router.get('/test', async (req, res) => {
    // 获取请求参数
    const { _ } = req.query
    sendSuccessResponse(res)
  })

  router.post('/validate', ...jwt(), (req: DRequest, resp) => {
    sendSuccessResponse(resp, { admin: req.auth.admin })
  })

  router.post('/auth', generateJwtRoute)

  // event stream
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

  app.use('', router)
  app.use('/api', router)
}
