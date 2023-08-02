import { useContext } from 'react'
import { AppContext } from './utils/context'
import styled from 'styled-components'
import { colors, device } from './styles/stylevars'

// Components imports
import SideBar from './components/SideBar'
import GridGameList from './components/GridGameList'
import TableGameList from './components/TableGameList'
import Loading from './components/Loading'

const StyledAppContainer = styled.div`
  display: flex;
  color: ${colors.white};
  width: 100%;
  height: 100%;
  @media ${device.tablet} {
    flex-direction: column;
  };
`

const StyledMain = styled.main`
  width: 100%;
`

export default function App() {
  const { isLoading, displayMode } = useContext(AppContext);

  return (
    <StyledAppContainer>
      {isLoading && (<Loading />)}
      {!isLoading && (
        <>
          <SideBar />
          <StyledMain>
            {displayMode === 'grid' && <GridGameList />}
            {displayMode === 'table' && <TableGameList />}
          </StyledMain>
        </>
      )}
    </StyledAppContainer>
  )
}