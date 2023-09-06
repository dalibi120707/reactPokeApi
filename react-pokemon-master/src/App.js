import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchAllPokemons, fetchPokemon } from './api/fetchPokemon';
import PokemonCard from './components/PokemonCard';
import SkeletonCard from './components/SkeletonCard';
import { classNames, sortItems } from './common/helper';
import { useTheme } from './theme/useTheme';
function App() {


  const inputRef = useRef(null)
  const [ currentPokemon, setCurrentPokemon ] = useState({})
  const [ sortBy, setSortBy ] = useState('')
  const { theme, toggleTheme } = useTheme()
  const [ pag, setPag ] = useState({
    from: 1,
    till: 20,
  })

  // console.log(pag)
  const [ pokemonList, setPokemonList ] = useState([])

  useEffect(() => {
    submitPokemons()
  }, [])

  const submitPokemons = () => {
    fetchAllPokemons(pag.from, pag.till)
      .then((data) => {
        const newData = pokemonList.concat(data)
        setPokemonList(newData)
      })
      .then((data) => {
        setPag(prev => ({ from: prev.from + 20, till: prev.till + 20}))
      })
  }

  const handleSearch = () => {
    fetchPokemon(inputRef.current.value)
      .then((data) => {
        setCurrentPokemon(data)
      })
  }

  const handleNextPage = () => {
    setPag(prev => ({ from: prev.from + 20, till: prev.till + 20 }))
  }

  const handlePrevPage = () => {
    if (pag.from === 1) {
      return
    }
    setPag(prev => ({ from: prev.from - 20, till: prev.till - 20 }))
  }
  function handleSortWeight(e) {
    setSortBy(e.target.name);
  }
  return (
    <div className={`App ${theme}`}>
      <input ref={inputRef} placeholder='search'/>
      <button onClick={handleSearch}>Get pokemon</button>
      <button className='btn' onClick={toggleTheme}>Change color</button>
      <button className={classNames('active', sortBy === 'weight')} name='weight' onClick={handleSortWeight}>Самый толстый</button>
      <button className={classNames('active', sortBy === 'attack')} name='attack' onClick={handleSortWeight}>MOST STRONG</button>
      <PokemonCard pokemon={currentPokemon}/>

      <button onClick={handlePrevPage}>prev page</button>
      <button onClick={handleNextPage}>next page</button>

      <InfiniteScroll
      dataLength={pokemonList.length}
      next={submitPokemons}
      hasMore={true}
      loader={<div>
        {[...Array(20+pokemonList.length)].map((item) => <SkeletonCard/>)}
      </div>}
      >
        {sortItems(pokemonList, sortBy).map((item) => 
          <PokemonCard pokemon={item}/>
        )}
      </InfiniteScroll>
    </div>
  );
}

export default App;
