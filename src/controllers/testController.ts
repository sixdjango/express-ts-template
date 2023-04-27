import type { Router } from 'express'
import { testService } from '@/services/testService'
import { sendSuccessResponse } from '@/helpers/respHelper'

export const setupTestController = (router: Router) => {
  router.post('/test', async (req, res) => {
    const { title } = req.body
    const data = await testService.createTest(title)
    sendSuccessResponse(res, data)
  })
}
