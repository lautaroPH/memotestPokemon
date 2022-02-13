import { useEffect, useState } from 'react';
import MemotestCard from '../MemotestCard';
import './MemotestCards.css';

const MemotestCards = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedMemoBlock, setSelectedMemoBlock] = useState(null);
  const [animating, setAnimating] = useState(false);

  const fetchDataPokemon = async () => {
    const offset = Math.floor(Math.random() * (1100 - 0 + 1) + 0);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offset}`
      );
      const data = await response.json();
      const pokemonsResults = shuffleArray([...data.results, ...data.results]);
      setPokemons(
        pokemonsResults.map((pokemon, i) => ({
          index: i,
          pokemon,
          flipped: false,
        }))
      );
    } catch (error) {
      throw new Error(err);
    }
  };

  const shuffleArray = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  useEffect(() => {
    fetchDataPokemon();
  }, []);

  const handleMemoClick = (pokemonBlock) => {
    const flippedMemoBlock = { ...pokemonBlock, flipped: true };

    let shuffledMemoBlocksCopy = [...pokemons];
    shuffledMemoBlocksCopy.splice(pokemonBlock.index, 1, flippedMemoBlock);

    setPokemons(shuffledMemoBlocksCopy);

    if (selectedMemoBlock === null) {
      setSelectedMemoBlock(pokemonBlock);
    } else if (selectedMemoBlock.pokemon.name === pokemonBlock.pokemon.name) {
      setSelectedMemoBlock(null);
    } else {
      setAnimating(true);
      setTimeout(() => {
        shuffledMemoBlocksCopy.splice(pokemonBlock.index, 1, pokemonBlock);
        shuffledMemoBlocksCopy.splice(
          selectedMemoBlock.index,
          1,
          selectedMemoBlock
        );
        setPokemons(shuffledMemoBlocksCopy);
        setSelectedMemoBlock(null);
        setAnimating(false);
      }, 1000);
    }
  };

  return (
    <div className="container">
      <div className="memotestContainer">
        {pokemons.map((pokemon) => (
          <MemotestCard
            key={pokemon.index}
            pokemon={pokemon}
            animating={animating}
            handleMemoClick={handleMemoClick}
          />
        ))}
      </div>
    </div>
  );
};

export default MemotestCards;
