import type { Request as JWTRequest } from 'express-jwt'
import { expressjwt } from 'express-jwt'
import type { NextFunction, Response } from 'express'
import { getSecret } from '@/helpers/envHelper'

export const jwt = () => {
  const jwtMiddleware = expressjwt({ secret: getSecret(), algorithms: ['HS256'] })
  const route = (req: JWTRequest, res: Response, next: NextFunction) => {
    if (!req.auth)
      return res.sendStatus(401)
    next()
  }
  return [jwtMiddleware, route]
}
