import { useContext } from 'react';
import { MemoBlockNumber } from '../../context/MemoBlockContext';
import { VALUES_DIFFICULTY } from '../../helpers/ValuesDifficulty';
import './Header.css';

const Header = () => {
  const difficulty =
    localStorage.getItem('memoBlock') || VALUES_DIFFICULTY.HARD;
  const { setLimit } = useContext(MemoBlockNumber);

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
      <h1>
        <span className="red">M</span>
        <span className="lime">e</span>
        <span className="blue">m</span>
        <span className="orange">o</span>
        <span className="aquamarine">t</span>
        <span className="blueviolet">e</span>
        <span className="coral">s</span>
        <span className="crimson">t</span>
        <span> </span>
        <span className="gold">P</span>
        <span className="lawngreen">o</span>
        <span className="mediumpurple">k</span>
        <span className="orchid">e</span>
        <span className="salmon">m</span>
        <span className="tomato">o</span>
        <span className="violet">n</span>
      </h1>
      <div className="containerInputSelect">
        <p>Dificultad:</p>
        <div className="caja">
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
      </div>
    </div>
  );
};

export default Header;
