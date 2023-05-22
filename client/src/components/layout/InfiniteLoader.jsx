import styled from 'styled-components'
import { colors, device } from '../../styles/stylevars'
import useInView from '../../utils/hooks/useInView'
import { useContext, useEffect } from 'react'
import { AppContext } from '../../utils/context'

const StyledInfiniteLoader = styled.span`
  display: flex;
  justify-content: center;
  padding: 1rem;
  color: ${colors.green};
  @media ${device.mobile} {
    margin-bottom: 1rem;
  };
`

export default function InfiniteLoader() {
  const [LoaderRef, LoaderIsInView] = useInView();
  const { setDisplayedGamesCount } = useContext(AppContext);

  useEffect(() => {
    if(LoaderIsInView === true) {
      setDisplayedGamesCount(current => current + 20);
    }
  },[LoaderIsInView, setDisplayedGamesCount])

  return (
    <StyledInfiniteLoader ref={LoaderRef}>
      Loading more data ...
    </StyledInfiniteLoader>  
  )
}