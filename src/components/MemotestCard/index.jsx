import './MemotestCard.css';

const MemotestCard = ({ pokemon, animating, handleMemoClick }) => {
  const pokemonImage = pokemon?.pokemon?.sprites?.other?.home?.front_default;

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
