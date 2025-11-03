import { Routes, Route } from 'react-router-dom'
import Container from '@mui/material/Container'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import YouTubeShorts from './pages/YouTubeShorts'
import ChannelManagement from './pages/ChannelManagement'
import Header from './components/Header/Header'

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 3, mb: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/youtube-shorts" element={<YouTubeShorts />} />
          <Route path="/channel-management" element={<ChannelManagement />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
