import { State } from "./state.js";

export async function commandPokedex(state: State) {
    if (Object.keys(state.pokedex).length === 0) {
        console.log("You have not caught any Pokemon yet!");
        return;
    }
    
    console.log("Your Pokedex:");
    for (const pokemonName in state.pokedex) {
        console.log(`- ${state.pokedex[pokemonName].name}`);
    }
}