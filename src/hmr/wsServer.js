import { WebSocketServer } from 'ws'

let sockets = []

export function setupWebSocket(server) {
  const wss = new WebSocketServer({ server })

  wss.on('connection', (socket) => {
    sockets.push(socket)
    socket.on('close', () => {
      sockets = sockets.filter(s => s !== socket)
    })
  })
  
  return {
    broadcast: (msg) => {
      const payload = JSON.stringify(msg)
      sockets.forEach(s => s.send(payload))
    }
  }
}
