import { shuffleArray } from './ShuffleArray';

export const fetchDataPokemons = async (limit) => {
  let pokemons = [];

  for (let i = 0; i < limit; i++) {
    const offset = Math.floor(Math.random() * (898 - 1 + 1) + 1);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${offset}`);
    const data = await response.json();
    pokemons[i] = [data, data];
  }
  const pokemonsFlat = pokemons.flat(Infinity);
  const pokemonsRandom = shuffleArray(pokemonsFlat);
  return pokemonsRandom;
};
