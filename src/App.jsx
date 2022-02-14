import { useState } from 'react';
import Header from './components/Header';
import MemotestCards from './components/MemotestCards';
import { FailsContext } from './context/FailsContext';
import { MemoBlockNumber } from './context/MemoBlockContext';
import { VALUES_DIFFICULTY } from './helpers/ValuesDifficulty';

function App() {
  const limitForMemoBlockInLocalStorage =
    localStorage.getItem('memoBlock') || VALUES_DIFFICULTY.HARD;

  const [limit, setLimit] = useState(limitForMemoBlockInLocalStorage);
  const [fails, setFails] = useState(0);

  return (
    <MemoBlockNumber.Provider value={{ limit, setLimit }}>
      <FailsContext.Provider value={{ fails, setFails }}>
        <div>
          <Header />
          <MemotestCards />
        </div>
      </FailsContext.Provider>
    </MemoBlockNumber.Provider>
  );
}

export default App;
