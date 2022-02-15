import { useContext, useEffect, useState } from 'react';
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

  const [finishedMemoTest, setfinishedMemoTest] = useState(0);

  const [diff, setDiff] = useState(null);
  const [initial, setInitial] = useState(null);
  const [stop, setStop] = useState(false);

  const [fails, setFails] = useState(0);

  const { limit } = useContext(MemoBlockNumber);

  const getPokemons = (limitPokemon) => {
    setLoading(true);
    fetchDataPokemons(limitPokemon).then((data) => {
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
  };

  const handleMemoClick = (pokemonBlock) => {
    const flippedMemoBlock = { ...pokemonBlock, flipped: true };

    let shuffledMemoBlocksCopy = [...pokemons];
    shuffledMemoBlocksCopy.splice(pokemonBlock.index, 1, flippedMemoBlock);

    setPokemons(shuffledMemoBlocksCopy);

    if (selectedMemoBlock === null) {
      setSelectedMemoBlock(pokemonBlock);
    } else if (selectedMemoBlock.pokemon.name === pokemonBlock.pokemon.name) {
      setSelectedMemoBlock(null);
      setfinishedMemoTest(finishedMemoTest + 1);
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
      }, 800);
    }
  };

  const tick = () => {
    setDiff(new Date(+new Date() - initial));
  };

  const start = () => {
    if (initial === null) {
      setInitial(+new Date());
    }
  };

  useEffect(() => {
    getPokemons(limit);
  }, [limit]);

  useEffect(() => {
    if (finishedMemoTest == limit) {
      setStop(true);
    }
  }, [finishedMemoTest, limit]);

  useEffect(() => {
    if (initial && !stop) {
      requestAnimationFrame(tick);
    }
  }, [initial, stop]);

  useEffect(() => {
    if (diff && !stop) {
      requestAnimationFrame(tick);
    }
  }, [diff, stop]);

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
              start={start}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default MemotestCards;
