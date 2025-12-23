import { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
    // list the pokemon fetched
    if (args.length !== 1) {
        throw new Error("you must provide a location name {only 1 location}");
    }
    
    const locationName = args[0];

    console.log(`Exploring ${args[0]}...`);

    const location = await state.pokeAPI.fetchLocation(locationName);

    for (const pokemonEncounter of location.pokemon_encounters) {
        console.log(`-  ${pokemonEncounter.pokemon.name}`);
    }
}