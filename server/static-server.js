import express from 'express'
import path from 'node:path'

const app = express()
const PORT = 8080
const distPath = path.resolve(process.cwd(), 'dist')

app.use(express.static(distPath))
app.use((_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Dashboard UI serving on http://127.0.0.1:${PORT}`)
})
