import { useEffect, useState, useRef } from 'react'
import './style/reset.css'
import './style/globals.css'
import { colors, device } from './style/stylevars'
import styled from 'styled-components'
import Logo from './components/Logo'
import FilterBar from './components/FilterBar'
import { settings } from '../settings'
import axios from 'axios'
import GameTable from './components/GameTable'
import { sortGameData } from './utils/sortGameData'
import { filterGameDataByGenre, filterGameDataByMode } from './utils/filterGameData'
import Loader from './components/Loader'
import Pagination from './components/Pagination'
import GameCard from './components/GameCard'
import AppSettings from './components/AppSettings'
import SearchBar from './components/SearchBar'
import { Link } from "react-router-dom"

const StyledApp = styled.div`
  min-height: 100vh;
  color: ${colors.white};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  font-family: 'Trebuchet MS';
  padding: 2rem;
`

const StyledAppContainer = styled.div`
  background-color: ${colors.darkblue};
  max-width: 1000px;
  margin-top: 2rem;
  flex-grow: 1;
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media ${device.tablet} {
    flex-direction: column;
  };
`

const StyledSettingsStacker = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  @media ${device.mobile} {
    flex-wrap: wrap;
  };
`

const StyledCardsContainer = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(3, minmax(250px, 1fr));
  @media ${device.tablet} {
    grid-gap: 1rem;
    grid-template-columns: repeat(3, minmax(200px, 1fr));
  };
  @media ${device.mobile} {
    grid-gap: 1rem;
    grid-template-columns: repeat(1, minmax(250px, 1fr));
  };
`

const StyledLink = styled.div`
  text-decoration: none;
  font-size: 1.5rem;
  color: inherit;
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  &:hover {
    color: ${colors.green}
  }
`

function App() {
  const [isLoading, setIsLoading]= useState(true);
  const [selectedSorting, setSelectedSorting] = useState(settings.defaultSortMethod);
  const [selectedGenreFilter, setSelectedGenreFilter] = useState(['all']);
  const [selectedModeFilter, setSelectedModeFilter] = useState(['all']);
  const [gameData, setGameData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [modeData, setModeData] = useState([]);
  const [displayMode, setDisplayMode] = useState(settings.defaultDisplayMode);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const cardsRef = useRef(null)

  // Game data filtering
  const sortedGameData = sortGameData([...gameData], selectedSorting);
  const genreFilteredGameData = filterGameDataByGenre(sortedGameData, selectedGenreFilter);
  const modeFilteredGameData = filterGameDataByMode(genreFilteredGameData, selectedModeFilter);

  // Search
  const searchFilteredData = modeFilteredGameData.filter(game=>{
    return game.name.toLowerCase().replace(/\s/g, '').includes(searchValue.toLowerCase().replace(/\s/g, ''))
  });

  // Pagination
  const gameOnPageCount = displayMode === 'table' ? settings.gameCountInTable : settings.gameCountInCards;
  const pageCount = Math.ceil(searchFilteredData.length / gameOnPageCount);
  const paginatedData = searchFilteredData.slice((currentPage-1)*gameOnPageCount, gameOnPageCount+((currentPage-1)*gameOnPageCount));
  const executeScroll = () => cardsRef.current.scrollIntoView()

  // Fetching all app data
  useEffect(()=>{
    fetchData();
  },[])

  const fetchData = () => {
    // Fetching game data
    axios.get(settings.gameDataUrl)
      .then(res => {
        setGameData(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err)
      })

    // Fetching genre data
    axios.get(settings.genreDataUrl)
      .then(res => {
        setGenreData(res.data);
      })
      .catch(err => {
        console.log(err)
      })

    // Fetching gamemodes data
    axios.get(settings.modeDataUrl)
      .then(res => {
        setModeData(res.data);
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <StyledApp>
      <StyledAppContainer>
        <StyledHeader>
          <Logo/>
          <StyledSettingsStacker>
            <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} setCurrentPage={setCurrentPage}/>
            <AppSettings displayMode={displayMode} setDisplayMode={setDisplayMode} setCurrentPage={setCurrentPage}/>
          </StyledSettingsStacker>
        </StyledHeader>
        <FilterBar 
          selectedSorting={selectedSorting} 
          setSelectedSorting={setSelectedSorting} 
          genreData={genreData}
          modeData={modeData}
          selectedGenreFilter={selectedGenreFilter}
          setSelectedGenreFilter={setSelectedGenreFilter}
          selectedModeFilter={selectedModeFilter}
          setSelectedModeFilter={setSelectedModeFilter}
          setCurrentPage={setCurrentPage}
        />
        {isLoading && <Loader/>}
        {!isLoading && displayMode==='table' && (<GameTable gameData={paginatedData}/>)}
        {!isLoading && displayMode==='cards' && (
          <>
            <StyledCardsContainer ref={cardsRef}>
              {paginatedData.map(game=>(
                <GameCard game={game} key={game.id} genreData={genreData} modeData={modeData}/>
              ))}
            </StyledCardsContainer>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pageCount={pageCount} executeScroll={executeScroll}/>
          </>
        )}
        <StyledLink as={Link} to={'/about'}>
          about
        </StyledLink>
      </StyledAppContainer>
    </StyledApp>
  )
}

export default App
