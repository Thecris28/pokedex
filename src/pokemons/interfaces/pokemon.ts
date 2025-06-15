export interface PokemonResponse {
    count:    number;
    next:     string;
    previous: null;
    results:  Result[];
}

export interface Result {
    name: string;
    url:  string;
}

export type Pokemon = {
    id: string;
    name: string;
}

