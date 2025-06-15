
import PokemonGrid from "@/pokemons/components/PokemonGrid";
import { Pokemon, PokemonResponse } from "@/pokemons/interfaces/pokemon";

export const metadata = {
  title: 'Pokemon List',
  description: 'A list of Pokemon fetched from the PokeAPI'
} 

async function getPokemon ( limit=20, offset=0 ): Promise<Pokemon[]>{
  const data: PokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,{
      cache: 'force-cache'
  }
  ).then(response => response.json())

  const pokemons = data.results.map((pokemon) => {
    const url = pokemon.url.split('/')
    const id = url[url.length - 2]
    return {
      id,
      name: pokemon.name
    }
  })
  return pokemons
}

export default async function PokemonPage() {
  // const data = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,{
  //    cache: 'force-cache'
  // })
  // .then(response => response.json())
  const data = await getPokemon(151)

  return (
    <div className="flex flex-col space-y-4 p-4">
      <h1 className="text-2xl font-bold">Listado de Pokemon</h1>
      <PokemonGrid data={data}/>
    </div>
  )
}
