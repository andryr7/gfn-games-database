import styled from 'styled-components'

const StyledSideBarSectionTitle = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
`

export default function SideBarSectionTitle({ children }) {
  return (
    <StyledSideBarSectionTitle>
      {children}
    </StyledSideBarSectionTitle>  
  )
}