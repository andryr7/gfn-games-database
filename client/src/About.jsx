import './style/reset.css'
import { colors } from './style/stylevars'
import styled from 'styled-components'
import Logo from './components/Logo'
import { Link } from "react-router-dom"

const StyledApp = styled.div`
  min-height: 100vh;
  color: ${colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Trebuchet MS';
`

const StyledAppContainer = styled.div`
  background-color: ${colors.darkblue};
  max-width: 600px;
  margin-top: 2rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
`

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
`

const StyledPageTitle = styled.h1`
  text-align: center;
  font-size: 5rem;
`

const StyledText = styled.p`
  font-size: 1.5rem;
  text-align: justify;
`

const StyledLink = styled.a`
  font-size: 2rem;
  text-decoration: none;
  color: inherit;
  &:hover {
    color: ${colors.green}
  }
`

function About() {
  return (
    <StyledApp>
      <StyledAppContainer>
        <StyledHeader>
          <Logo/>
        </StyledHeader>
        <StyledPageTitle>About</StyledPageTitle>
        <StyledText>This website was made in an attempt to find in a easier way which games I could play, as I now use GFN as my primary gaming platform. I am a junior web developer and also wanted to train on a project that involved building a backend, used external APIs and implemented automatization. I you have any suggestion of improvement or critic, I would gladly receive them at <a href="mailto:contact@andryratsimba.com">contact@andryratsimba.com</a>. You can also checkout my <a href="https://andryratsimba.com/">portfolio</a>. Cheers</StyledText>
        <StyledLink to={'/'} as={Link}>Back to the app</StyledLink>
      </StyledAppContainer>
    </StyledApp>
  )
}

export default About
