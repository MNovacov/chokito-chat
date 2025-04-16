import { useEffect, useRef, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { ref, push, onValue, off, serverTimestamp } from 'firebase/database'
import { db } from '../firebase'
import '../styles/pixel-art.css'

export default function ChatRoom({ palette }) {
  const { roomId } = useParams()
  const { state } = useLocation()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const messagesEndRef = useRef(null)

  const sendMessage = (e) => {
    e.preventDefault()
    if (!message.trim()) return

    push(ref(db, `rooms/${roomId}/messages`), {
      user: state?.username || 'Anónimo',
      text: message.trim(),
      timestamp: serverTimestamp(),
      color: palette.primary
    })
    setMessage('')
  }

  useEffect(() => {
    const messagesRef = ref(db, `rooms/${roomId}/messages`)
    const usersRef = ref(db, `rooms/${roomId}/users`)

    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val() || {}
      setMessages(Object.values(data))
    })

    onValue(usersRef, (snapshot) => {
      const data = snapshot.val() || {}
      setUsers(Object.values(data))
    })

    return () => {
      off(messagesRef)
      off(usersRef)
    }
  }, [roomId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="pixel-room" style={{ backgroundColor: palette.secondary }}>
      <div className="room-header">
        <h2 className="pixel-text">SALA: {roomId}</h2>
        <div className="online-count">
          {users.filter((u) => u.online).length} ONLINE
        </div>
      </div>

      <div className="chat-container">
        <div className="messages-box">
          {messages.map((msg, i) => (
            <div key={i} className="message-bubble" style={{ backgroundColor: msg.color }}>
              <strong>{msg.user}:</strong> {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={sendMessage} className="message-form">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="pixel-input"
            placeholder="Escribe tu mensaje..."
          />
          <button type="submit" className="pixel-button">Enviar</button>
        </form>
      </div>
    </div>
  )
}
