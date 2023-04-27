import { PrismaClient } from '@prisma/client'

export const initPrisma = () => {
  const prisma = new PrismaClient()
  logger.info('Prisma 连接成功')
  global.prisma = prisma
}
