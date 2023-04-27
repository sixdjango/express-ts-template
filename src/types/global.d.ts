import { Pool } from 'mysql2'

declare global {
  var globalString: string
  var mysql: Pool
}

export {}