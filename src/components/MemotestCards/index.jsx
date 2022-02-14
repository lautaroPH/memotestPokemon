import { useContext, useEffect, useState } from 'react';
import { FailsContext } from '../../context/FailsContext';
import { MemoBlockNumber } from '../../context/MemoBlockContext';
import { fetchDataPokemons } from '../../helpers/FetchDataPokemons';
import { VALUES_DIFFICULTY } from '../../helpers/ValuesDifficulty';
import Loader from '../Loader';
import MemotestCard from '../MemotestCard';
import './MemotestCards.css';

const MemotestCards = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedMemoBlock, setSelectedMemoBlock] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [loading, setLoading] = useState(true);

  const { setFails, fails } = useContext(FailsContext);

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
      setFails(0);
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
        setFails(fails + 1);
      }, 1000);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div
          className={`${
            limit == VALUES_DIFFICULTY.EASY
              ? 'memotestContainerEasy'
              : limit == VALUES_DIFFICULTY.MEDIUEM
              ? 'memotestContainerMediuem'
              : 'memotestContainer'
          }`}
        >
          {pokemons.map((pokemon) => (
            <MemotestCard
              key={pokemon.index}
              pokemon={pokemon}
              animating={animating}
              handleMemoClick={handleMemoClick}
              limit={limit}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default MemotestCards;
