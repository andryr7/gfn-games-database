import styled from 'styled-components'
import { colors } from '../../styles/stylevars'

const StyledGameCount = styled.a`
  display: block;
  margin-top: auto;
  &:hover {
    color: ${colors.green};
  }
`

export default function About() {

  return(
    <StyledGameCount href="https://andryratsimba.com">
      About
    </StyledGameCount>
  )
}