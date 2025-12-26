import { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]) {
    // list the pokemon fetched
    if (args.length !== 1) {
        throw new Error("you must provide a pokemon name {only 1 location}");
    }
    
    const pokemonName = args[0];
    const pokemon = state.pokedex[pokemonName];

    if (!pokemon) {
        console.log("you have not caught that pokemon");
        return
    }

    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log("Stats:");
    for (const pokeStat of pokemon.stats) {
        console.log(`-${pokeStat.stat.name}: ${pokeStat.base_stat}`);
    }
    console.log("Types:");
    for (const pokeType of pokemon.types) {
        console.log(`- ${pokeType.type.name}`);
    }
}