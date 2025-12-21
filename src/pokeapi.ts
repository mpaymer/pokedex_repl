export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    constructor() {}

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        // pageURL defines the ENTIRE route you need to go to
        const url = pageURL || `${PokeAPI.baseURL}/location-area`;
        
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const locations: ShallowLocations = await response.json();
            return locations;
        } catch (error) {
            throw new Error(`Error fetching locations: ${(error as Error).message}`);
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const location: Location = await response.json();
            return location;
        } catch (error) {
            throw new Error(`Error fetching location: ${(error as Error).message}`);
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