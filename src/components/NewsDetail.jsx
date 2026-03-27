import { newsItems } from '../data/news'

function renderMarkdown(text) {
  // Simple markdown renderer for bold, headers, and lists
  const lines = text.split('\n')
  const elements = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="article-h2">{line.slice(3)}</h2>)
    } else if (line.startsWith('# ')) {
      elements.push(<h1 key={i} className="article-h1">{line.slice(2)}</h1>)
    } else if (line.startsWith('- ')) {
      const listItems = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        listItems.push(<li key={i}>{renderInline(lines[i].slice(2))}</li>)
        i++
      }
      elements.push(<ul key={`ul-${i}`} className="article-list">{listItems}</ul>)
      continue
    } else if (line.trim() === '') {
      elements.push(<br key={i} />)
    } else {
      elements.push(<p key={i} className="article-p">{renderInline(line)}</p>)
    }
    i++
  }

  return elements
}

function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

export default function NewsDetail({ id, onBack }) {
  const item = newsItems.find((n) => n.id === id)
  if (!item) return null

  return (
    <div className="news-detail">
      <div className="detail-meta">
        <span className="card-category">{item.category}</span>
        <span className="card-tag">{item.tag}</span>
        <span className="card-date">{item.date} · {item.readTime}</span>
      </div>
      <h1 className="detail-title">{item.title}</h1>
      <p className="detail-summary">{item.summary}</p>
      <div className="detail-divider" />
      <div className="detail-content">
        {renderMarkdown(item.content)}
      </div>
      <button className="back-btn-bottom" onClick={onBack}>
        ← Back to Headlines
      </button>
    </div>
  )
}
