import styled from 'styled-components'
import GridIcon from '../buttons/GridIcon'
import ListIcon from '../buttons/ListIcon'
import { useContext } from 'react'
import { AppContext } from '../../utils/context'
import SideBarSection from '../layout/SideBarSection'
import SideBarSectionTitle from '../layout/SideBarSectionTitle'
import { colors } from '../../styles/stylevars'

const StyledDisplayModeSelector = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledModeSelector = styled.button`
  height: 48px;
  width: 48px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
	background-color: ${colors.grey};
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
  border-radius: 10px;
  &.selected {
    background-color: ${colors.green};
  }
`

export default function DisplayModeSelector() {
  const {displayMode, setDisplayMode} = useContext(AppContext);

  return (
    <SideBarSection>
      <StyledDisplayModeSelector>
        <StyledModeSelector onClick={() => setDisplayMode('grid')} className={displayMode === 'grid' && 'selected'}>
          <GridIcon selected={displayMode === 'grid'}/>
        </StyledModeSelector>
        <SideBarSectionTitle>
          view
        </SideBarSectionTitle>
        <StyledModeSelector onClick={() => setDisplayMode('table')} className={displayMode === 'table' && 'selected'}>
          <ListIcon selected={displayMode === 'table'}/>
        </StyledModeSelector>
      </StyledDisplayModeSelector>
    </SideBarSection>
  )
}