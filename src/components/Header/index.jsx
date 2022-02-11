import styles from './styles.module.css';

const Header = () => {
  return (
    <div className={styles.containerHeader}>
      <h1>Memotest Pokemon</h1>
      <div className={styles.containerInputSelect}>
        <p>Dificultad:</p>
        <select className={styles.inputSelect}>
          <option>FACIL</option>
          <option>NORMAL</option>
          <option>DIFICIL</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
