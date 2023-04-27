import { Pool } from 'mysql2'
import { Logger } from 'winston'
import {PrismaClient} from '@prisma/client'

declare global {
  var mysql: Pool
  var prisma: PrismaClient
  var logger: Logger
}

export {}