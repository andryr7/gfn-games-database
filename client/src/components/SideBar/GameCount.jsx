import { useContext } from 'react'
import styled from 'styled-components'
import { AppContext } from '../../utils/context'
import { colors } from '../../styles/stylevars'

const StyledGameCount = styled.span`
  display: block;
  color: ${colors.grey};
`

export default function GameCount() {
  const { refinedData } = useContext(AppContext);
  const gameCount = refinedData.length;

  return(
    <StyledGameCount>
      {`${gameCount} games found`}
    </StyledGameCount>
  )
}