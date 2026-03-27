export default function NewsCard({ item, onClick }) {
  return (
    <article className="news-card" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}>
      <div className="card-meta">
        <span className="card-category">{item.category}</span>
        <span className="card-tag">{item.tag}</span>
        <span className="card-date">{item.date}</span>
      </div>
      <h2 className="card-title">{item.title}</h2>
      <p className="card-summary">{item.summary}</p>
      <div className="card-footer">
        <span className="read-time">{item.readTime}</span>
        <span className="read-link">Read more →</span>
      </div>
    </article>
  )
}
