import { BrowserRouter as Router } from 'react-router-dom'
import HeaderBar from './components/HeaderBar'
import Sidebar from './components/Sidebar'
import AudienceBuilderLanding from './features/audienceBuilder/AudienceBuilderLanding'
import './App.css'

function App() {
  return (
    <Router>
      <HeaderBar />
      <div className="app" style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <Sidebar />
        <main style={{ flex: 1 }}>
          <div className="main-content-container" style={{ paddingLeft: 0 }}>
            <div className="page-heading" style={{ fontWeight: 700, fontSize: 24, marginBottom: 16, marginTop: 8 }}>
              Audience Builder
            </div>
            <div className="content-container">
              <AudienceBuilderLanding />
            </div>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App
