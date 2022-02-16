import { useContext, useEffect, useState } from 'react';
import { MemoBlockNumber } from '../../context/MemoBlockContext';
import { fetchDataPokemons } from '../../helpers/FetchDataPokemons';
import { VALUES_DIFFICULTY } from '../../helpers/ValuesDifficulty';
import ButtonReset from '../ButtonReset';
import Loader from '../Loader';
import MemotestCard from '../MemotestCard';
import Modal from '../Modal';
import CanvasConfetti from 'https://cdn.skypack.dev/canvas-confetti';
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

  const [isOpenModal, setIsOpenModal] = useState(false);

  const { limit } = useContext(MemoBlockNumber);

  const difficulty = localStorage.getItem('difficulty') || 'DIFICIL';

  const getPokemons = (limitPokemon) => {
    setLoading(true);
    setStop(true);
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
      setfinishedMemoTest(0);
      setDiff(null);
      setInitial(null);
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

  useEffect(() => {
    getPokemons(limit);
  }, [limit]);

  const tick = () => {
    setDiff(new Date(+new Date() - initial));
  };

  const start = () => {
    if (initial === null) {
      setInitial(+new Date());
      setStop(false);
    }
  };

  useEffect(() => {
    if (finishedMemoTest == limit) {
      setStop(true);
      setIsOpenModal(true);
      setfinishedMemoTest(0);
      CanvasConfetti({
        particleCount: 1000,
        startVelocity: 60,
        spread: 360,
      });
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
        <div>
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
          <ButtonReset limit={limit} fails={fails} getPokemons={getPokemons} />
          <Modal
            difficulty={difficulty}
            fails={fails}
            time={diff}
            limit={limit}
            getPokemons={getPokemons}
            isOpenModal={isOpenModal}
            setIsOpenModal={setIsOpenModal}
          />
        </div>
      )}
    </>
  );
};

export default MemotestCards;
