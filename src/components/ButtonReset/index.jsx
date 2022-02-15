import { VALUES_DIFFICULTY } from '../../helpers/ValuesDifficulty';
import './ButtonReset.css';

const ButtonReset = ({ limit, fails, getPokemons }) => {
  return (
    <div
      className={`${
        limit == VALUES_DIFFICULTY.EASY
          ? 'footerEasy'
          : limit == VALUES_DIFFICULTY.MEDIUEM
          ? 'footerMediuem'
          : 'footerHard'
      }`}
    >
      <p>
        Fallos: <span>{fails}</span>
      </p>
      <button className="buttonReset" onClick={() => getPokemons(limit)}>
        Resetear
      </button>
    </div>
  );
};

export default ButtonReset;
