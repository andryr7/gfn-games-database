import styled from "styled-components"
import { colors, device } from "../style/stylevars"

const StyledLogoContainer = styled.div`
  display: flex;
  font-weight: bold;
`

const StyledLogoFirstPart = styled.h1`
  color: ${colors.green};
  font-size: 10rem;
  @media ${device.mobile} {
    font-size: 5rem;
  };
`

const StyledLogoSecondPart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 3.5rem;
  @media ${device.mobile} {
    font-size: 1.75rem;
  };
`

function Logo() {

  return (
    <StyledLogoContainer>
      <StyledLogoFirstPart>GFN</StyledLogoFirstPart>
      <StyledLogoSecondPart>
        <h2>games</h2>
        <h2>database</h2>
      </StyledLogoSecondPart>
    </StyledLogoContainer>
  )
}

export default Logo
