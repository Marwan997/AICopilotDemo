import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distPath = path.resolve(__dirname, '..', 'dist')
const monitoringDistPath = path.resolve(__dirname, '..', 'dist-monitoring')
const port = 8080

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon',
}

const server = http.createServer((req, res) => {
  const requestPath = req.url?.split('?')[0] ?? '/'
  const isMonitoring = requestPath === '/monitoring' || requestPath.startsWith('/monitoring/')
  const activeDistPath = isMonitoring ? monitoringDistPath : distPath
  const normalizedPath = requestPath === '/monitoring'
    ? '/monitoring.html'
    : isMonitoring
      ? requestPath.replace(/^\/monitoring/, '') || '/'
      : requestPath
  const effectivePath = normalizedPath === '/' ? '/index.html' : normalizedPath
  const filePath = path.join(activeDistPath, effectivePath)
  const safePath = path.normalize(filePath)

  if (!safePath.startsWith(activeDistPath)) {
    res.writeHead(403)
    res.end('Forbidden')
    return
  }

  const fallbackFile = isMonitoring ? 'monitoring.html' : 'index.html'
  const finalPath = fs.existsSync(safePath) && fs.statSync(safePath).isFile()
    ? safePath
    : path.join(activeDistPath, fallbackFile)

  fs.readFile(finalPath, (error, data) => {
    if (error) {
      res.writeHead(500)
      res.end('Internal Server Error')
      return
    }

    const ext = path.extname(finalPath)
    res.writeHead(200, {
      'Content-Type': mimeTypes[ext] ?? 'application/octet-stream',
      'Cache-Control': finalPath.endsWith('index.html') ? 'no-cache' : 'public, max-age=31536000, immutable',
    })
    res.end(data)
  })
})

server.listen(port, '127.0.0.1', () => {
  console.log(`Dashboard UI serving on http://127.0.0.1:${port}`)
})
