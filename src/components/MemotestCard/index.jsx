import { useEffect, useState } from 'react';
import './MemotestCard.css';

const MemotestCard = ({ flipped, index, name, url }) => {
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

  return (
    <div className="memotestBox">
      <div>
        <div className="memotestBoxBorderRadiusBig">
          <div className="memotestBoxBorderRadiusMediuem">
            <div className="memotestBoxBorderRadiusSmall"></div>
          </div>
        </div>
        <div className="memotestBoxPokemon">
          <img className="pokemonImage" src={pokemonImage} alt={pokemon.name} />
        </div>{' '}
      </div>
    </div>
  );
};

export default MemotestCard;
