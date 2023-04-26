import * as jwt from 'jsonwebtoken'
import { getSecret } from './envHelper'

export const verifyJwt = (token: string) => {
  token = token.split(' ')[1]
  return jwt.verify(token, getSecret(), { algorithms: ['HS256'] })
}
