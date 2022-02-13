import { shuffleArray } from './ShuffleArray';

export const fetchDataPokemons = async (limit) => {
  const offset = Math.floor(Math.random() * (1100 - 0 + 1) + 0);

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const data = await response.json();
    const pokemonsResults = shuffleArray([...data.results, ...data.results]);
    return pokemonsResults;
  } catch (error) {
    throw new Error(err);
  }
};
