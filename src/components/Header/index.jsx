import { useContext } from 'react';
import { FailsContext } from '../../context/FailsContext';
import { MemoBlockNumber } from '../../context/MemoBlockContext';
import { VALUES_DIFFICULTY } from '../../helpers/ValuesDifficulty';
import './Header.css';

const Header = () => {
  const difficulty =
    localStorage.getItem('memoBlock') || VALUES_DIFFICULTY.HARD;
  const { setLimit } = useContext(MemoBlockNumber);
  const { fails } = useContext(FailsContext);

  const handleChange = (e) => {
    let index = e.target.selectedIndex;
    const textValue = e.target.options[index].text;
    const numberValue = e.target.value;

    localStorage.setItem('difficulty', textValue);
    localStorage.setItem('memoBlock', numberValue);
    setLimit(numberValue);
  };

  return (
    <div className="containerHeader">
      <h1>Memotest Pokemon</h1>
      <div className="containerInputSelect">
        <p>Dificultad:</p>
        <select
          defaultValue={difficulty}
          className="inputSelect"
          onChange={handleChange}
        >
          <option label="FACIL" value={VALUES_DIFFICULTY.EASY}>
            FACIL
          </option>
          <option label="NORMAL" value={VALUES_DIFFICULTY.MEDIUEM}>
            NORMAL
          </option>
          <option label="DIFICIL" value={VALUES_DIFFICULTY.HARD}>
            DIFICIL
          </option>
        </select>
      </div>
      <p>
        Fallos: <span>{fails}</span>
      </p>
    </div>
  );
};

export default Header;
