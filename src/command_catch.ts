import { State } from './state.js';

export async function commandCatch(state: State, ...args: string[]) {
    if (args.length !==1) {
        throw new Error("you must provide a pokemon name {only 1 pokemon}");
    }

    const pokemonName = args[0];
    
    const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);

    console.log(`Throwing a Pokeball at ${pokemon.name}...`);

    // get "base experience" of pokemon
    const baseExperience = pokemon.base_experience;

    // use probability formala to check for success
    const k = 0.005;
    const failProbability = 1 - Math.exp(-k * baseExperience);

    if (Math.random() < failProbability) {
        // fail
        console.log(`${pokemon.name} escaped!`);
    } else {
        // success
        console.log(`${pokemon.name} was caught!`);
        // add to pokedex if does not already exist
        if (!(pokemon.name in state.pokedex)) {
            state.pokedex[pokemon.name] = pokemon;
        }
    }
}