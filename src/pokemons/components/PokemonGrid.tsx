import { Pokemon } from "../interfaces/pokemon";
import PokemonCard from "./PokemonCard";

type PokemonProps = {
    data: Pokemon[];
}

export default function PokemonGrid({data}: PokemonProps) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {
          data.map((pokemon) => (
        <div key={pokemon.name}>
            <PokemonCard pokemon={pokemon}/>
        </div>
          ))
        }
        

      </div>
    )
}
