import { useContext, useEffect, useState } from 'react';
import { MemoBlockNumber } from '../../context/MemoBlockContext';
import { fetchDataPokemons } from '../../helpers/FetchDataPokemons';
import Loader from '../Loader';
import MemotestCard from '../MemotestCard';
import './MemotestCards.css';

const MemotestCards = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedMemoBlock, setSelectedMemoBlock] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [loading, setLoading] = useState(true);

  const { limit } = useContext(MemoBlockNumber);

  useEffect(() => {
    setLoading(true);
    fetchDataPokemons(limit).then((data) => {
      setPokemons(
        data.map((pokemon, i) => ({
          index: i,
          pokemon,
          flipped: false,
        }))
      );
      setLoading(false);
      setSelectedMemoBlock(null);
    });
  }, [limit]);

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
      {loading ? (
        <Loader />
      ) : (
        <div className="memotestContainer">
          {pokemons.map((pokemon) => (
            <MemotestCard
              key={pokemon.index}
              pokemon={pokemon}
              animating={animating}
              handleMemoClick={handleMemoClick}
              loading={loading}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MemotestCards;
