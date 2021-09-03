import { useEffect, useState } from 'react'
import { db } from '../user'

const Chat = () => {
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState<any[]>([])

  useEffect(() => {
    const match: any = {
      // lexical queries are kind of like a limited RegEx or Glob.
      '.': {
        // property selector
        '>': new Date(+new Date() - 1000 * 60 * 60 * 3).toISOString(), // find any indexed property larger ~3 hours ago
      },
      '-': 1, // filter in reverse
    }

    db.get('chatmattias')
      .map(match)
      .once(async (data) => {
        if (data) {
          if (data.message) {
            setMessages((prevState) => [...prevState, data.message])
          }
        }
      })
  }, [])
  const sendMessage = async () => {
    const index = new Date().toISOString()
    db.get('chatmattias').get(index).put({ message: newMessage })
    setNewMessage('')
  }
  return (
    <div>
      Chat!
      <input
        value={newMessage}
        type="text"
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage} type="button">
        send
      </button>
      <ul>
        {messages.map((m) => {
          return <li key={m}>{m}</li>
        })}
      </ul>
    </div>
  )
}
export default Chat
