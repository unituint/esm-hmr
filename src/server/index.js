import { createServer } from 'http'
import { handleRequest } from './staticHandler.js'
import { setupWebSocket } from '../hmr/wsServer.js'
import { watchFiles } from './fileWatcher.js'

const server = createServer(handleRequest)
const { broadcast } = setupWebSocket(server)

watchFiles(broadcast)

server.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000')
})
