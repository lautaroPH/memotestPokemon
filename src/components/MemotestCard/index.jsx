import './MemotestCard.css';

const MemotestCard = ({ pokemon, animating, handleMemoClick, start }) => {
  const pokemonImage = pokemon?.pokemon?.sprites?.other?.home?.front_default;

  const handleMemoClickStart = (pokemonClick) => {
    if (!pokemon.flipped && !animating) {
      handleMemoClick(pokemonClick);
      start();
    }
  };

  return (
    <div className="memo-block" onClick={() => handleMemoClickStart(pokemon)}>
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
