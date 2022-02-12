import './Header.css';

const Header = () => {
  return (
    <div className="containerHeader">
      <h1>Memotest Pokemon</h1>
      <div className="containerInputSelect">
        <p>Dificultad:</p>
        <select className="inputSelect">
          <option>FACIL</option>
          <option>NORMAL</option>
          <option>DIFICIL</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
