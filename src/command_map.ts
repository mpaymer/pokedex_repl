import { State } from "./state.js";

export async function commandMapForward(state: State) {
    // list the locations fetched
    const locations = await state.pokeAPI.fetchLocations(state.nextLocationsURL);

    // cache state of prevURL and nextURL
    state.prevLocationsURL = locations.previous;
    state.nextLocationsURL = locations.next;

    for (const location of locations.results) {
        console.log(location.name);
    }

}

export async function commandMapBack(state: State) {
    // check if on first page
    if (!state.prevLocationsURL) {
        throw new Error("you're on the first page");
    }
    
    // list the locations fetched
    const locations = await state.pokeAPI.fetchLocations(state.prevLocationsURL);

    // cache state of prevURL and nextURL
    state.prevLocationsURL = locations.previous;
    state.nextLocationsURL = locations.next;

    for (const location of locations.results) {
        console.log(location.name);
    }
}