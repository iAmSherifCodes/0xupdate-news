import express from 'express'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DB = join(__dirname, 'data', 'posts.json')
const app = express()

app.use(express.json())

function readPosts() {
  if (!existsSync(DB)) return []
  return JSON.parse(readFileSync(DB, 'utf-8'))
}

function writePosts(posts) {
  writeFileSync(DB, JSON.stringify(posts, null, 2))
}

// POST /api/result — store incoming JSON body
app.post('/api/result', (req, res) => {
  const posts = readPosts()
  const entry = {
    id: Date.now(),
    receivedAt: new Date().toISOString(),
    body: req.body,
  }
  posts.unshift(entry)
  writePosts(posts)
  res.status(201).json({ ok: true, id: entry.id })
})

// GET /api/result — return paginated posts
app.get('/api/result', (req, res) => {
  const posts = readPosts()
  const page = Math.max(1, parseInt(req.query.page) || 1)
  const limit = Math.max(1, Math.min(50, parseInt(req.query.limit) || 5))
  const total = posts.length
  const totalPages = Math.ceil(total / limit)
  const items = posts.slice((page - 1) * limit, page * limit)
  res.json({ items, total, page, totalPages, limit })
})

// DELETE /api/result/:id — remove a single post
app.delete('/api/result/:id', (req, res) => {
  const posts = readPosts()
  const id = parseInt(req.params.id)
  const next = posts.filter((p) => p.id !== id)
  if (next.length === posts.length) return res.status(404).json({ error: 'Not found' })
  writePosts(next)
  res.json({ ok: true })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`API server running on http://localhost:${PORT}`))
