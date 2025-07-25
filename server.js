import { createServer } from 'http'
import { WebSocketServer } from 'ws'
import { readFile } from 'fs/promises'
import path, { extname } from 'path'
import chokidar from 'chokidar'
import process from 'process'

const allowedExtensions = ['.html', '.js']

const server = createServer(async (req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost')
  const ext = path.extname(pathname)

  if (ext && !allowedExtensions.includes(ext)) {
    res.writeHead(404)
    res.end('Not supported')
    return
  }

  const filePath = path.join(
    process.cwd(), 
    pathname === '/' ? '/index.html' : pathname
  )

  try {
    const data = await readFile(filePath)
    const ext = extname(filePath)
    const type = (
      ext === '.js' ? 'application/javascript' :
      ext === '.html' ? 'text/html' : 'text/plain' 
    )

    res.writeHead(200, { 'Content-Type': type })
    res.end(data)
  } catch (err) {
    console.error('❌ File not found:', filePath)
    res.writeHead(404)
    res.end('Not found')
  }
})

const wss = new WebSocketServer({ server })
let sockets = []

wss.on('connection', (socket) => {
  sockets.push(socket)
  socket.on('close', () => {
    sockets = sockets.filter(s => s !== socket)
  })
})

chokidar.watch('./').on('change', (file) => {
  console.log('🔁 Changed:', file)
  sockets.forEach(s => s.send(JSON.stringify({ type: 'reload' })))
})

server.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000')
})
