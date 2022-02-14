import { shuffleArray } from './ShuffleArray';

export const fetchDataPokemons = async (limit) => {
  let arrayPokemon = [];
  let arrayPokemon2 = [];
  let pokemons = [];

  for (let i = 0; i < limit; i++) {
    const offset = Math.floor(Math.random() * (898 - 1 + 1) + 1);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${offset}`);
    const data = await response.json();
    arrayPokemon[i] = data;
    arrayPokemon2[i] = data;
    pokemons = shuffleArray([...arrayPokemon, ...arrayPokemon2]);
  }
  return pokemons;
};
