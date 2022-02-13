import { useEffect, useState } from 'react';
import { fetchDataPokemons } from '../../helpers/FetchDataPokemons';
import MemotestCard from '../MemotestCard';
import './MemotestCards.css';

const MemotestCards = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedMemoBlock, setSelectedMemoBlock] = useState(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    fetchDataPokemons().then((data) => {
      setPokemons(
        data.map((pokemon, i) => ({
          index: i,
          pokemon,
          flipped: false,
        }))
      );
    });
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
