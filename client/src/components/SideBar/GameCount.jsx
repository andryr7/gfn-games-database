import { useContext } from 'react'
import styled from 'styled-components'
import { AppContext } from '../../utils/context'
import { colors } from '../../styles/stylevars'

const StyledGameCount = styled.span`
  display: block;
  color: ${colors.grey};
`

export default function GameCount() {
  const { gameData, refinedData } = useContext(AppContext);
  const gameCount = gameData.length;
  const filteredGameCount = refinedData.length;

  return(
    <>
      <StyledGameCount>
        {`Showing ${filteredGameCount} of ${gameCount} games`}
      </StyledGameCount>
    </>
  )
}