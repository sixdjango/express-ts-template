import type { Response } from 'express'

export const sendSuccessResponse = (res: Response, data?: any, message = 'success') => {
  res.status(200).send({ code: 200, message, data })
}

export const sendServerErrorResponse = (res: Response, code = 500, message?: string, data?: any) => {
  res.status(500).send({ code, message, data })
}

export const sendBadRequestResponse = (res: Response, code = 400, message?: string, data?: any) => {
  res.status(400).send({ code, message, data })
}

export const sendUnauthorizedResponse = (res: Response, code = 401, message?: string, data?: any) => {
  res.status(401).send({ code, message, data })
}
