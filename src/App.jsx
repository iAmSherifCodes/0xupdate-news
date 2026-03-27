import { useState } from 'react'
import NewsList from './components/NewsList'
import NewsDetail from './components/NewsDetail'
import './App.css'

export default function App() {
  const [selectedId, setSelectedId] = useState(null)

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-prefix">0x</span>
            <span className="logo-name">Ups</span>
            <span className="logo-tag">NEWS</span>
          </div>
          {selectedId && (
            <button className="back-btn" onClick={() => setSelectedId(null)}>
              ← Back to Headlines
            </button>
          )}
        </div>
      </header>

      <main className="main">
        {selectedId === null ? (
          <NewsList onSelect={setSelectedId} />
        ) : (
          <NewsDetail id={selectedId} onBack={() => setSelectedId(null)} />
        )}
      </main>

      <footer className="footer">
        <span>0xUps News · On-chain. Always.</span>
      </footer>
    </div>
  )
}
