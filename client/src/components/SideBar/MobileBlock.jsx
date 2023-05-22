import styled from "styled-components"
import { colors } from "../../styles/stylevars"
import SideBarSection from "./../layout/SideBarSection"

const StyledLogoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
`

const StyledTitleFirstPart = styled.h2`
  font-size: 110px;
  font-weight: 700;
  color: ${colors.green};
`

const StyledTitleSecondPart = styled.h1`
  font-size: 50px;
`

export default function MobileBlock() {
  return (
    <SideBarSection>
      <StyledLogoBlock>
        <StyledTitleFirstPart>
          GFN
        </StyledTitleFirstPart>
        <StyledTitleSecondPart>
          database
        </StyledTitleSecondPart>
      </StyledLogoBlock>
    </SideBarSection>
  )
}