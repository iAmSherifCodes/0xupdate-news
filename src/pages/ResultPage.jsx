import { useState, useEffect, useCallback } from 'react'

const PER_PAGE = 5

export default function ResultPage() {
  const [data, setData] = useState({ items: [], total: 0, totalPages: 1 })
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)

  const load = useCallback(async (p) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/result?page=${p}&limit=${PER_PAGE}`)
      const json = await res.json()
      setData(json)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load(page) }, [page, load])

  async function handleDelete(id) {
    await fetch(`/api/result/${id}`, { method: 'DELETE' })
    load(page)
  }

  return (
    <div className="result-page">
      <div className="result-header">
        <h1 className="list-title">Incoming Requests</h1>
        <p className="list-subtitle">
          {data.total} post{data.total !== 1 ? 's' : ''} received · POST to <code>/api/result</code>
        </p>
      </div>

      {loading ? (
        <div className="result-empty">Loading...</div>
      ) : data.items.length === 0 ? (
        <div className="result-empty">
          No posts yet. Send a POST request to <code>/api/result</code> with a JSON body.
        </div>
      ) : (
        <div className="result-list">
          {data.items.map((entry) => (
            <div key={entry.id} className="result-card">
              <div className="result-card-meta">
                <span className="card-category">POST</span>
                <span className="result-id">#{entry.id}</span>
                <span className="card-date">{new Date(entry.receivedAt).toLocaleString()}</span>
                <div className="result-actions">
                  <button
                    className="toggle-btn"
                    onClick={() => setExpanded(expanded === entry.id ? null : entry.id)}
                  >
                    {expanded === entry.id ? 'Collapse' : 'Expand'}
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(entry.id)}>
                    Delete
                  </button>
                </div>
              </div>

              {/* Always show top-level string fields as a summary */}
              <div className="result-summary">
                {Object.entries(entry.body).map(([k, v]) =>
                  typeof v === 'string' || typeof v === 'number' ? (
                    <div key={k} className="result-field">
                      <span className="field-key">{k}</span>
                      <span className="field-val">{String(v)}</span>
                    </div>
                  ) : null
                )}
              </div>

              {/* Full raw JSON when expanded */}
              {expanded === entry.id && (
                <pre className="result-raw">{JSON.stringify(entry.body, null, 2)}</pre>
              )}
            </div>
          ))}
        </div>
      )}

      {data.totalPages > 1 && (
        <div className="pagination">
          <button className="page-btn" onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
            ← Prev
          </button>
          <div className="page-numbers">
            {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((n) => (
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
            disabled={page === data.totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  )
}
