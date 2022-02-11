import { useEffect, useState } from 'react';
import MemotestCard from '../MemotestCard';
import styles from './styles.module.css';

const MemotestCards = () => {
  const [records, setRecords] = useState(0);
  const [pokemons1, setPokemons1] = useState([]);
  const [pokemons2, setPokemons2] = useState([]);

  const fetchDataPokemon = async () => {
    const offset = Math.floor(Math.random() * (1100 - 0 + 1) + 0);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offset}`
      );
      const data = await response.json();
      setPokemons1(data.results);
      setPokemons2(data.results);
    } catch (error) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    fetchDataPokemon();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.memotestContainer}>
        {pokemons1.map((pokemon) => (
          <MemotestCard
            key={pokemon.name}
            records={records}
            setRecords={setRecords}
            name={pokemon.name}
            url={pokemon.url}
          />
        ))}
        {pokemons2.map((pokemon) => (
          <MemotestCard
            key={pokemon.name}
            records={records}
            setRecords={setRecords}
            name={pokemon.name}
            url={pokemon.url}
          />
        ))}
      </div>
    </div>
  );
};

export default MemotestCards;
