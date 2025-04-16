import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import JoinScreen from './components/JoinScreen'
import ChatRoom from './components/ChatRoom'
import './App.css'

function App() {
  const [colorPalette, setColorPalette] = useState('green')

  const palettes = {
    green: { primary: '#b5ead7', secondary: '#c7ceea', text: '#2d3436' },
    dark: { primary: '#2d3436', secondary: '#636e72', text: '#dfe6e9' },
    blue: { primary: '#a2d2ff', secondary: '#bde0fe', text: '#1d3557' },
    orange: { primary: '#ffdac1', secondary: '#e2f0cb', text: '#6d6875' }
  }

  return (
    <div className="app" style={{ backgroundColor: palettes[colorPalette].secondary }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <JoinScreen 
              palettes={palettes} 
              setColorPalette={setColorPalette} 
            />} 
          />
          <Route path="/:roomId" element={
            <ChatRoom 
              palette={palettes[colorPalette]} 
            />} 
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
