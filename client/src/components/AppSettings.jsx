import styled from "styled-components"
import { colors, device } from '../style/stylevars'

const StyledSettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledViewSelector = styled.div`
  display: flex;
  flex-direction: column;
  @media ${device.tablet} {
    flex-direction: row;
  };
`

const StyledViewButton = styled.div`
  cursor: pointer;
  background-color: ${colors.lightblue};
  font-size: 1.5rem;
  padding: 1rem;
  &:first-of-type {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    @media ${device.tablet} {
      border-top-right-radius: 0;
      border-bottom-left-radius: 5px;
    };
  }
  &:last-of-type {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    @media ${device.tablet} {
      border-top-right-radius: 5px;
      border-bottom-left-radius: 0;
    };
  }
  &.selected {
    background-color: ${colors.green};
  }
  &:hover {
    color: ${colors.darkblue}
  }
`

function AppSettings({ displayMode, setDisplayMode, setCurrentPage }) {

  return (
    <StyledSettingsContainer>
      <StyledViewSelector>
        <StyledViewButton className={displayMode==='table'&&'selected'} onClick={()=>{setDisplayMode('table'); setCurrentPage(1)}}>Table</StyledViewButton>
        <StyledViewButton className={displayMode==='cards'&&'selected'} onClick={()=>{setDisplayMode('cards'); setCurrentPage(1)}}>Cards</StyledViewButton>
      </StyledViewSelector>
    </StyledSettingsContainer>
  )
}

export default AppSettings
