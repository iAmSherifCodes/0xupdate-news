import { newsItems } from '../data/news'
import NewsCard from './NewsCard'

export default function NewsList({ onSelect }) {
  return (
    <div className="news-list">
      <div className="list-header">
        <h1 className="list-title">Latest Updates</h1>
        <p className="list-subtitle">{newsItems.length} stories · Updated today</p>
      </div>
      <div className="cards-grid">
        {newsItems.map((item) => (
          <NewsCard key={item.id} item={item} onClick={() => onSelect(item.id)} />
        ))}
      </div>
    </div>
  )
}
