import { createPool } from 'mysql2'
import { logger } from '@/logs'

export const initMySQL = () => {
  const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'test',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  })

  logger.info('MySQL 连接成功')

  global.mysql = pool
}
