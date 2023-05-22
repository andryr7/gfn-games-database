import styled from 'styled-components'
import { colors } from '../../styles/stylevars'

const StyledSideBarSectionContainer = styled.div`
  background-color: ${colors.darkgrey};
  border-radius: 10px;
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
  user-select: none;
`

export default function SideBarSection({ children }) {
  return (
    <StyledSideBarSectionContainer>
      {children}
    </StyledSideBarSectionContainer>  
  )
}