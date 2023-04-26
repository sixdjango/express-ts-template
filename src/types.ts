import type { Request } from 'express-jwt'
import type { User } from './models/user'

export type DRequest = { user?: User } & Request
