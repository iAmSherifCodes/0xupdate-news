import { useState } from 'react'
import { newsItems } from '../data/news'
import NewsCard from './NewsCard'

const PER_PAGE = 4

export default function NewsList({ onSelect }) {
  const [page, setPage] = useState(1)
  const sorted = [...newsItems].sort((a, b) => new Date(b.date) - new Date(a.date))
  const totalPages = Math.ceil(sorted.length / PER_PAGE)
  const visible = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div className="news-list">
      <div className="list-header">
        <h1 className="list-title">Latest Updates</h1>
        <p className="list-subtitle">{newsItems.length} stories · Updated today</p>
      </div>
      <div className="cards-grid">
        {visible.map((item) => (
          <NewsCard key={item.id} item={item} onClick={() => onSelect(item.id)} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-btn"
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
          >
            ← Prev
          </button>
          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                className={`page-num ${n === page ? 'active' : ''}`}
                onClick={() => setPage(n)}
              >
                {n}
              </button>
            ))}
          </div>
          <button
            className="page-btn"
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  )
}
