import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import { getRefinedData } from "../data";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [displayMode, setDisplayMode] = useState('grid');
  const [searchInput, setSearchInput] = useState('');
  const [sortMode, setSortMode] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [gameData, setGameData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [gamemodeData, setGamemodeData] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([0]);
  const [selectedGamemodes, setSelectedGamemodes] = useState([0]);
  const [displayedGamesCount, setDisplayedGamesCount] = useState(20);
  const [menuIsOpened, setMenuIsOpened] = useState(true);
  const refinedData = getRefinedData(
    gameData,
    searchInput,
    sortMode,
    sortDirection,
    selectedGenres,
    selectedGamemodes
  );

  useEffect(() => {
    async function fetchData() {
      if(window.innerWidth <= 1280) {
        setMenuIsOpened(false);
        setDisplayMode('table');
      }

      try {
        const [gameData, genreData, modeData] = await Promise.all([
          axios.get('/api/games'),
          axios.get('/api/genres'),
          axios.get('/api/gamemodes'),
          // axios.get('http://localhost:3000/api/games'),
          // axios.get('http://localhost:3000/api/genres'),
          // axios.get('http://localhost:3000/api/gamemodes')
        ]);
        setGameData(gameData.data);
        setGenreData(genreData.data);
        setGamemodeData(modeData.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Listening for screen size changes to call menu closing function
  useEffect(()=>{
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  },[]);

  // Menu closing function
  const handleWindowResize = (e) => {
    if (e.currentTarget.innerWidth > 1280) {
      setMenuIsOpened(true);
    }
    else {
      setMenuIsOpened(false);
    }
  };

  // Updating the UI when the sorting or filtering options change
  useEffect(() => {
    setDisplayedGamesCount(20);
    window.scrollTo(0, 0);
  },[sortMode, sortDirection, selectedGenres, selectedGamemodes])

  return (
    <AppContext.Provider value={{
      isLoading,
      setIsLoading,
      gameData,
      genreData,
      gamemodeData,
      displayMode, 
      setDisplayMode,
      searchInput,
      setSearchInput, 
      sortMode,
      setSortMode,
      sortDirection,
      setSortDirection,
      selectedGenres,
      setSelectedGenres,
      selectedGamemodes,
      setSelectedGamemodes,
      displayedGamesCount,
      setDisplayedGamesCount,
      refinedData,
      menuIsOpened,
      setMenuIsOpened
    }}>
      {children}
    </AppContext.Provider>
  )
}