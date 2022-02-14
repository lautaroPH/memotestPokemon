import { useState } from 'react';
import Header from './components/Header';
import MemotestCards from './components/MemotestCards';
import { MemoBlockNumber } from './context/MemoBlockContext';
import { VALUES_DIFFICULTY } from './helpers/ValuesDifficulty';

function App() {
  const limitForMemoBlockInLocalStorage =
    localStorage.getItem('memoBlock') || VALUES_DIFFICULTY.HARD;

  const [limit, setLimit] = useState(limitForMemoBlockInLocalStorage);

  return (
    <MemoBlockNumber.Provider value={{ limit, setLimit }}>
      <div>
        <Header />
        <MemotestCards />
      </div>
    </MemoBlockNumber.Provider>
  );
}

export default App;
