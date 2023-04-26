import type { Request, Response } from 'express'
import { sendServerErrorResponse, sendSuccessResponse, sendUnauthorizedResponse } from 'src/helpers/respHelper'
import * as jwt from 'jsonwebtoken'
import { getEnv } from '@/helpers/envHelper'
import { EnvKeys } from '@/constants/env'

export const generateJwtRoute = (req: Request, res: Response) => {
  try {
    const { defaultToken } = req.body
    if (defaultToken !== getEnv(EnvKeys.DEFAULT_TOKEN))
      return sendUnauthorizedResponse(res)

    // 生成 token
    const token = jwt.sign({ admin: 'django' }, getEnv(EnvKeys.JWT_SECRET))

    return sendSuccessResponse(res, { token: `Bearer ${token}` })
  }
  catch (e) {
    sendServerErrorResponse(res)
  }
}
