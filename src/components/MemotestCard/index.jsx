import { useEffect, useState } from 'react';
import './MemotestCard.css';

const MemotestCard = ({ pokemon, animating, handleMemoClick }) => {
  const [pokemonImg, setPokemonImg] = useState([]);
  const pokemonImage = pokemonImg?.sprites?.other?.home?.front_default;

  const fetchDataPokemon = async () => {
    try {
      const response = await fetch(`${pokemon.pokemon.url}`);
      const data = await response.json();
      setPokemonImg(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchDataPokemon();
  }, []);

  return (
    <div
      className="memo-block"
      onClick={() => !pokemon.flipped && !animating && handleMemoClick(pokemon)}
    >
      <div
        className={`memo-block-inner ${
          pokemon.flipped && `memo-block-flipped`
        }`}
      >
        <div className="memo-block-front">
          <div className="memotestBoxBorderRadiusBig">
            <div className="memotestBoxBorderRadiusMediuem">
              <div className="memotestBoxBorderRadiusSmall"></div>
            </div>
          </div>
        </div>
        <div className="memo-block-back">
          <img
            className="pokemonImage"
            src={pokemonImage}
            alt={pokemon.pokemon.name}
          />
        </div>{' '}
      </div>
    </div>
  );
};

export default MemotestCard;
