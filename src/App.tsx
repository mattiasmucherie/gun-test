import create from 'zustand'
import { devtools } from 'zustand/middleware'
import styled from 'styled-components'
import GlobalStyle from './styles/globalStyles'
import Credentials from './components/credentials'
import Header from './components/header'
import Chat from './components/chat'

const Container = styled.div`
  margin: auto;
  max-width: 800px;
  border: 1px solid black;
`

export const useStore = create(
  devtools((set) => ({
    username: '',
    setUser: (user: string) => set({ username: user }),
  }))
)

const App = () => {
  const username = useStore((state: any) => state.username)

  return (
    <Container>
      <GlobalStyle />
      <Header />
      {!username ? <Credentials /> : <Chat />}
    </Container>
  )
}

export default App
