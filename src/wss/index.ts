import { createServer } from 'http'
import { Server } from 'socket.io'
import type { Application } from 'express'
import { logger } from '@/logs'

export const initSocket = (app: Application) => {
  const httpServer = createServer(app)
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  })

  io.on('connection', (socket) => {
    logger.info('a user connected')
    logger.info(socket.request)
    socket.on('disconnect', () => {
      logger.info('user disconnected')
    })
    socket.on('chat', (msg) => {
      logger.info(msg)
    })
  })

  return httpServer
}
