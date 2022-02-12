import { useEffect, useState } from 'react';
import styles from './styles.module.css';

const MemotestCard = ({ flipped, index, name, url }) => {
  const [turnedAround, setTurnedAround] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const pokemonImage = pokemon?.sprites?.other?.home?.front_default;

  const fetchDataPokemon = async () => {
    try {
      const response = await fetch(`${url}`);
      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    fetchDataPokemon();
  }, []);

  const handlePieza = () => {
    setTurnedAround(true);
  };

  return (
    <>
      {!turnedAround ? (
        <div className={styles.memotestBox} onClick={handlePieza}>
          <div className={styles.memotestBoxBorderRadiusBig}>
            <div className={styles.memotestBoxBorderRadiusMediuem}>
              <div className={styles.memotestBoxBorderRadiusSmall}></div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.memotestBoxPokemon}>
          <img
            className={styles.pokemonImage}
            src={pokemonImage}
            alt={pokemon.name}
          />
        </div>
      )}
    </>
  );
};

export default MemotestCard;
