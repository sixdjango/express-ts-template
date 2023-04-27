import { Pool } from 'mysql2'
import { Logger } from 'winston'

declare global {
  var mysql: Pool
  var logger: Logger
}

export {}