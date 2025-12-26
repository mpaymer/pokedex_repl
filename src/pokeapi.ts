import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    #pokeCache: Cache;
    constructor(cacheInterval: number) {
        this.#pokeCache = new Cache(cacheInterval);
    }

    closeCache() {
        this.#pokeCache.stopReapLoop();
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        // pageURL defines the ENTIRE route you need to go to
        const url = pageURL || `${PokeAPI.baseURL}/location-area/?offset=0&limit=20`;
        // check if locations is in cache
        // use URL as cache key
        const cachedLocations = this.#pokeCache.get<ShallowLocations>(url);
        if (cachedLocations) {
            return cachedLocations;
        }
    
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const locations: ShallowLocations = await response.json();
            // Add location to cache
            this.#pokeCache.add<ShallowLocations>(url, locations);

            return locations;
        } catch (error) {
            throw new Error(`Error fetching locations: ${(error as Error).message}`);
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

        // check if location is in cache
        // use URL as cache key
        const cachedLocation = this.#pokeCache.get<Location>(url);
        if (cachedLocation) {
            return cachedLocation;
        }

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const location: Location = await response.json();

            // Add location to cache
            this.#pokeCache.add<Location>(url, location);

            return location;
        } catch (error) {
            throw new Error(`Error fetching location: ${(error as Error).message}`);
        }
    }

    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
        const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

        // check if pokemon is in cache
        // use URL as cache key
        const cachedPokemon = this.#pokeCache.get<Pokemon>(url);
        if (cachedPokemon) {
            return cachedPokemon;
        }

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const pokemon: Pokemon = await response.json();

            // Add pokemon to cache
            this.#pokeCache.add<Pokemon>(url, pokemon);

            return pokemon
        } catch (error) {
            throw new Error(`Error fetching pokemon: ${(error as Error).message}`);
        }
    }
}

export type ShallowLocations = {
    count: number;
    next: string;
    previous: string;
    results: {
        name: string;
        url: string;
    }[];
};

export type Location = {
  encounter_method_rates: {
    encounter_method: {
    name: string,
    url: string,
  }
  version_details: {
    rate: number,
    version: {
        name: string,
        url: string,
    },
  }[]
}[]
  game_index: number
  id: number
  location: {
    name: string,
    url: string,
  }
  name: string
  names: {
    language: {
        name: string,
        url: string,
    }
    name: string
  }[]
  pokemon_encounters: {
    pokemon: {
        name: string
        url: string
    }
    version_details: {
        encounter_details: {
            chance: number
            condition_values: any[]
            max_level: number
            method: {
                name: string,
                url: string,
            }
            min_level: number
        }[]
        max_chance: number
        version: {
            name: string
            url: string
        }
    }[]
  }[]
}

export type Pokemon = {
    abilities: {
        ability: {
            name: string;
            url: string;
        };
        is_hidden: boolean;
        slot: number;
    }[];
    base_experience: number;
    cries: {
        latest: string;
        legacy: string;
    };
    forms: {
        name: string;
        url: string;
    }[];
    game_indicies: {
        game_index: number;
        version: {
            name: string;
            url: string;
        }
    }[];
    height: number;
    held_items: {
        item: {
            name: string;
            url: string;
        };
        version_details: {
            rarity: number;
            version: {
                name: string;
                url: string;
            };
        }[];
    }[]
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: {
        move: {
            name: string;
            url: string;
        };
        version_group_details: {
            level_learned_at: number;
            move_learn_method: {
                name: string;
                url: string;
            };
            order?: number;
            verson_group: {
                name: string;
                url: string;
            };
        }[];
    }[];
    name: string;
    order: number;
    past_abilities: {
        abilities: {
            ability: any;
            is_hidden: boolean;
            slot: number;
        }[];
        generation: {
            name: string;
            url: string;
        };
    }[];
    past_types: {
        generation: {
            name: string;
            url: string;
        };
        types: {
            slot: number;
            type: {
                name: string;
                url: string;
            };
        }[];
    }[];
    species: {
        name: string;
        url: string;
    };
    sprites: {
        back_default: string;
        back_female: any;
        back_shiny: string;
        back_shiny_female: any;
        front_default: string;
        front_female: any;
        front_shiny: string;
        front_shiny_female: any;
        other: {
            dream_world: {
                front_default: string;
                front_female: any;
            };
            home: {
                front_default: string;
                front_female: any;
                front_shiny: string;
                front_shiny_female: any;
            };
            "official-artwork": {
                front_default: string;
                front_shiny: string;
            };
            showdown: {
                back_default: string;
                back_female: any;
                back_shiny: string;
                back_shiny_female: any;
                front_default: string;
                front_female: any;
                front_shiny: string;
                front_shiny_female: any;
            };
        };
        versions: {
            "generation-i": {
                "red-blue": {
                    back_default: string;
                    back_gray: string;
                    back_transparent: string;
                    front_default: string;
                    front_gray: string;
                    front_transparent: string;
                };
                yellow: {
                    back_default: string;
                    back_gray: string;
                    back_transparent: string;
                    front_default: string;
                    front_gray: string;
                    front_transparent: string;
                };
            };
            "generation-ii": {
                crystal: {
                    back_default: string;
                    back_shiny: string;
                    back_shiny_transparent: string;
                    back_transparent: string;
                    front_default: string;
                    front_shiny: string;
                    front_shiny_transparent: string;
                    front_transparent: string;
                };
                gold: {
                      back_default: string;
                        back_shiny: string;
                        front_default: string;
                        front_shiny: string;
                        front_transparent: string;
                };
                silver: {
                    back_default: string;
                    back_shiny: string;
                    front_default: string;
                    front_shiny: string;
                    front_transparent: string;
                };
            };
            "generation-iii": {
                emerald: {
                    front_default: string;
                    front_shiny: string;
                };
                "firered-leafgreen": {
                    back_default: string;
                    back_shiny: string;
                    front_default: string;
                    front_shiny: string;
                };
                "ruby-sapphire": {
                    back_default: string;
                    back_shiny: string;
                    front_default: string;
                    front_shiny: string;
                };
            };
            "generation-iv": {
                "diamond-pearl": {
                    back_default: string;
                    back_female: any;
                    back_shiny: string;
                    back_shiny_female: any;
                    front_default: string;
                    front_female: any;
                    front_shiny: string;
                    front_shiny_female: any;
                };
                "heartgold-soulsilver": {
                    back_default: string;
                    back_female: any;
                    back_shiny: string;
                    back_shiny_female: any;
                    front_default: string;
                    front_female: any;
                    front_shiny: string;
                    front_shiny_female: any;
                };
                platinum: {
                    back_default: string;
                    back_female: any;
                    back_shiny: string;
                    back_shiny_female: any;
                    front_default: string;
                    front_female: any;
                    front_shiny: string;
                    front_shiny_female: any;
                };
            };
            "generation-ix": {
                "scarlet-violet": {
                    front_default: string
                    front_female: any
                };
            };
            "generation-v": {
                "black-white": {
                    animated: {
                        back_default: string;
                        back_female: any;
                        back_shiny: string;
                        back_shiny_female: any;
                        front_default: string;
                        front_female: any;
                        front_shiny: string;
                        front_shiny_female: any;
                    };
                    back_default: string;
                    back_female: any;
                    back_shiny: string;
                    back_shiny_female: any;
                    front_default: string;
                    front_female: any;
                    front_shiny: string;
                    front_shiny_female: any;
                };
            };
            "generation-vi": {
                "omegaruby-alphasapphire": {
                    front_default: string;
                    front_female: any;
                    front_shiny: string;
                    front_shiny_female: any;
                };
                "x-y": {
                    front_default: string;
                    front_female: any;
                    front_shiny: string;
                    front_shiny_female: any;
                };
            };
            "generation-vii": {
                icons: {
                    front_default: string;
                    front_female: any;
                };
                "ultra-sun-ultra-moon": {
                    front_default: string;
                    front_female: any;
                    front_shiny: string;
                    front_shiny_female: any;
                };
            };
            "generation-viii": {
                "brilliant-diamond-shining-pearl": {
                    front_default: string;
                    front_female: any;
                };
                icons: {
                    front_default: string;
                    front_female: any;
                };
            };
        };
    };
    stats: {
        base_stat: number;
        effort: number;
        stat: {
            name: string;
            url: string;
        };
    }[];
    types: {
        slot: number;
        type: {
            name: string;
            url: string;
        };
    }[];
    weight: number;
}