import { createServer } from 'http'
import { Server } from 'socket.io'
import type { Application } from 'express'
import { logger } from '@/logs'
import { verifyJwt } from '@/helpers/tokenHelper'

const socketQueue = {}
const CLOSE_TIMEOUT = 1000 * 10
let io: Server = null

export const getSocketServer = () => {
  return io
}

export const sendAllMessage = (event: string, data: any) => {
  io.send(event, data)
}

export const initSocket = (app: Application) => {
  const httpServer = createServer(app)
  io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  })

  io.on('connection', (socket) => {
    // 设置心跳间隔为 5 秒
    logger.info('a user connected')

    // 保存 socket 到队列
    socketQueue[socket.id] = socket

    verifyJwt(socket.request.headers.authorization)

    let closeTimer = setTimeout(() => {
      if (socket)
        socket.disconnect()
      logger.info('user disconnected')
      closeTimer = null
    }, CLOSE_TIMEOUT)

    socket.on('disconnect', () => {
      delete socketQueue[socket.id]
      logger.info('主动关闭 socket')
    })

    socket.on('ping', () => {
      logger.info('pong')
      closeTimer.refresh()
      socket.emit('pong')
    })

    socket.on('chat', (msg) => {
      logger.info(msg)
    })
  })

  return httpServer
}
