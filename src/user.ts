import GUN from 'gun'
import { useStore } from './App'

require('gun/sea')
require('gun/axe')

// Database
export const db = GUN()

// Gun User
export const user = db.user().recall({ sessionStorage: true })

// @ts-ignore
db.on('auth', async () => {
  const alias = await user.get('alias')
  if (alias) {
    useStore.setState({ username: alias })
  }
  console.log(`signed in as ${alias}`)
})
