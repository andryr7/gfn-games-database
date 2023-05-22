import styled from 'styled-components'
import LoadingIcon from '../assets/loading.svg'

const StyledLoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Loading() {
  return (
    <StyledLoadingContainer>
      <img src={LoadingIcon} />
    </StyledLoadingContainer>
  )
}