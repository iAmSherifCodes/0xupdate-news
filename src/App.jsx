import { useState } from 'react'
import NewsList from './components/NewsList'
import NewsDetail from './components/NewsDetail'
import ResultPage from './pages/ResultPage'
import './App.css'

function useRoute() {
  const [path, setPath] = useState(window.location.pathname)
  const navigate = (to) => {
    window.history.pushState({}, '', to)
    setPath(to)
  }
  return { path, navigate }
}

export default function App() {
  const { path, navigate } = useRoute()
  const [selectedId, setSelectedId] = useState(null)

  const isResult = path === '/result'

  function handleSelect(id) {
    setSelectedId(id)
    navigate('/')
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo" onClick={() => { navigate('/'); setSelectedId(null) }} style={{ cursor: 'pointer' }}>
            <span className="logo-prefix">0x</span>
            <span className="logo-name">Ups</span>
            <span className="logo-tag">NEWS</span>
          </div>
          <nav className="header-nav">
            {selectedId && !isResult && (
              <button className="back-btn" onClick={() => setSelectedId(null)}>
                ← Headlines
              </button>
            )}
            <button
              className={`nav-btn ${isResult ? 'nav-btn-active' : ''}`}
              onClick={() => { navigate(isResult ? '/' : '/result'); setSelectedId(null) }}
            >
              {isResult ? '← News' : 'Results'}
            </button>
          </nav>
        </div>
      </header>

      <main className="main">
        {isResult ? (
          <ResultPage />
        ) : selectedId === null ? (
          <NewsList onSelect={handleSelect} />
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
