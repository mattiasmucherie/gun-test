import styled from 'styled-components'
import { useStore } from '../App'
import { Button } from '../styles/common-styled-components'
import { user } from '../user'

const HeaderContainer = styled.header`
  display: flex;
  height: 4rem;
  justify-content: space-between;
`
const AvatarImage = styled.img`
  width: 2rem;
  padding: 1rem;
`
const UserContainer = styled.div`
  display: flex;
  align-items: center;
`
const UserName = styled.p`
  font-weight: bold;
  margin: 0;
`

const Header = () => {
  const username = useStore((state: any) => state.username)
  const setUser = useStore((state: any) => state.setUser)

  const onSignout = () => {
    user.leave()
    setUser('')
  }
  return (
    <>
      {username ? (
        <HeaderContainer>
          <UserContainer>
            <AvatarImage
              src={`https://avatars.dicebear.com/api/micah/${username}.svg`}
              alt="avatar"
            />
            <UserName>{username}</UserName>
          </UserContainer>
          <Button type="button" onClick={onSignout}>
            Signout
          </Button>
        </HeaderContainer>
      ) : (
        <p>Please Signin</p>
      )}
    </>
  )
}

export default Header
