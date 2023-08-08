import { useContext } from 'react'
import { AppContext } from './utils/context'
import styled from 'styled-components'
import { colors, device } from './styles/stylevars'

// Components imports
import MobileSideBar from './components/MobileSideBar'
import DesktopSideBar from './components/DesktopSideBar'
import GridGameList from './components/GridGameList'
import TableGameList from './components/TableGameList'
import Loading from './components/Loading'
import { useMediaQuery } from './utils/hooks/useMediaQuery'

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
  const isMobile = useMediaQuery(`(max-width: 1280px)`);
  console.log(isMobile)

  return (
    <StyledAppContainer>
      {isLoading && (<Loading />)}
      {!isLoading && (
        <>
          {isMobile && <MobileSideBar />}
          {!isMobile && <DesktopSideBar />}
          <StyledMain>
            {displayMode === 'grid' && <GridGameList />}
            {displayMode === 'table' && <TableGameList />}
          </StyledMain>
        </>
      )}
    </StyledAppContainer>
  )
}