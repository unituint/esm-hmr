import { readFile } from 'fs/promises'
import path, { extname } from 'path'
import process from 'process'

const allowedExtensions = ['.html', '.js']

export async function handleRequest(req, res) {
  const { pathname } = new URL(req.url, 'http://localhost')
  const ext = path.extname(pathname)

  if (ext && !allowedExtensions.includes(ext)) {
    res.writeHead(404)
    res.end('Not supported')
    return
  }

  const filePath = path.join(
    process.cwd(), 
    pathname === '/' ? '/src/client/index.html' : pathname
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
}
