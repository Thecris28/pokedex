import { Pokemon } from "@/pokemons/interfaces/pokemon-api"

import Image from "next/image"
import { Tabs, Tab } from "@/pokemons/components/Tabs"
import { notFound } from "next/navigation"
import { Species } from "@/pokemons/interfaces/species-response"
import { Metadata } from "next"

// Se ejecuta en build time para generar las rutas estáticas
export async function generateStaticParams() {

    const staticPokemon = Array.from({length: 151}).map((v, index) => `${index + 1}`)
    
    return staticPokemon.map(id => ({
        id: id
    }))

}

export async function generateMetadata({ params }: {params: Promise<{ id: string }>}): Promise<Metadata> {
    try {
        const { id } = await params;
        const { name } = await getPokemon(id)
        return {
            title: `Pokemon ${id}`,
            description: `Información del pokemon ${name}`
        }

    } catch (error) {
        console.error('Error generating metadata:', error)
        return {
            title: 'Pokemon no encontrado',
            description: 'No se ha encontrado el pokemon'
        }
    }
}

async function getPokemon(id: string): Promise<Pokemon> {

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
            cache: 'force-cache'
        })
        const pokemon = await res.json()
        return pokemon


    } catch (error) {
        console.error('Error fetching pokemon:', error)
        notFound()
    }

}

async function getPokemonSpecies(id: string): Promise< Species > {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`, {
            cache: 'force-cache',
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching pokemon species:', error);
        notFound();
    }
}

const pokemonColors: { [key: string]: string } = {
    grass: 'bg-grass',
    fire: 'bg-fire',
    water: 'bg-water',
    bug: 'bg-bug',
    normal: 'bg-normal',
    poison: 'bg-poison',
    electric: 'bg-electric',
    ground: 'bg-ground',
    fairy: 'bg-fairy',
    fighting: 'bg-fighting',
    psychic: 'bg-psychic',
    rock: 'bg-rock',
    ghost: 'bg-ghost',
    ice: 'bg-ice',
    dragon: 'bg-dragon',
    dark: 'bg-dark',
    steel: 'bg-steel',
    flying: 'bg-flying'
}

export default async function PokemonPage({params}: {params: Promise<{ id: string }>}) {

    const { id } = await params;

    const pokemon = await getPokemon(id);

    const species = await getPokemonSpecies(id);

    const pokemonColor = pokemonColors[pokemon.types[0].type.name];

    const agregarCeros = (value: string) => {
        return value.padStart(3, '0');
    }

    return (
        <div className="flex mt-5 flex-col items-center text-slate-800">
            <div className={`relative flex flex-col items-center rounded-[20px] w-[700px] mx-auto ${pokemonColor} bg-clip-border shadow-lg`}>

                <div className="mt-2 mb-8 w-full">
                    <div className="flex justify-between items-center px-4 text-xl font-bold text-gray-100 capitalize">
                        <div className="mt-3.5">
                            <h1 className="font-bold text-2xl">{pokemon.name}</h1>
                            <div className="text-base font-medium flex mt-3">
                                {pokemon.types.map(type => (
                                    <div key={type.slot} className="relative text-white text-lg font-bold px-3 mr-3 ">
                                        <div className="absolute inset-0 bg-white/30 backdrop-blur-md rounded-2xl"></div>
                                        <p className=" relative z-10">{type.type.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-3.5">
                            <p className="pb-4">#{agregarCeros(id)}</p>
                            {
                            species.genera.map((genera, index) => {
                                if (genera.language.name === 'es') {
                                    return (
                                        <p key={index} className="text-sm text-gray-100">{genera.genus}</p>
                                    )
                                }
                                return null;
                            })}
                        </div>

                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="absolute z-[1] right-45 flex justify-center items-center opacity-30 animate-spin-slow">
                            <Image src="/poke.svg" width={300} height={300} alt="pokeball" />

                        </div>
                        <Image
                            src={pokemon.sprites.other?.dream_world.front_default ?? ''}
                            width={200}
                            height={200}
                            alt={`Imagen del pokemon ${pokemon.name}`}
                            className="mb-5 relative z-[2] right-15 mx-auto w-45  h-45"
                        />
                    </div>
                </div>
                <div className="flex justify-center gap-4 px-2 w-full rounded-t-4xl bg-white py-7">

                    <Tabs>
                        <Tab label="About">
                            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-5 py-4 drop-shadow-lg">
                                <div className="text-base font-medium w-full flex flex-col">
                                    {species?.flavor_text_entries.map((flavor, index) => {
                                        if (flavor.language.name === 'es' && (flavor.version.name === 'omega-ruby' || flavor.version.name === 'lets-go-pikachu')) {
                                            return (
                                                <p key={index} className="text-sm w-[90%] text-gray-700">{flavor.flavor_text}</p>
                                            )
                                        }
                                    })}

                                    <div className="mt-5 flex justify-between mx-auto w-[50%] ">
                                        <div>
                                            <p>Height</p>
                                            <p>{pokemon.height * 10} cm</p>
                                        </div>
                                        <div>
                                            <p>Weight</p>
                                            {pokemon.weight / 10} kg
                                        </div>
                                    </div>
                                    <p className="pt-4 text-base font-bold text-gray-700">Breeding</p>

                                    <div>
                                        <p></p>
                                    </div>

                                </div>
                            </div>
                        </Tab>
                        <Tab label="Base Stats">
                            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 drop-shadow-lg">
                                {pokemon.stats.map(type => (
                                    <div key={type.stat.name} className="grip grid grid-cols-3 items-center  gap-2 w-full">
                                        <div className="col-span-1 flex justify-between w-full">
                                            <p className="mr-2 capitalize">{type.stat.name}</p>
                                            <p>{type.base_stat}</p>
                                        </div>
                                        <div className="w-full col-span-2 h-2.5 bg-gray-200 rounded-lg mr-2 mt-1 ">
                                            <div
                                                style={{ width: `${(type.base_stat / 252) * 100}%` }}
                                                className={`${pokemonColor} h-2.5 rounded-lg`}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Tab>
                        <Tab label="Sprites">
                            <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 drop-shadow-lg">
                                <p className="text-sm text-gray-600">Regular Sprites</p>
                                <div className="flex justify-center">
                                    <Image
                                        src={pokemon.sprites.front_default}
                                        width={100}
                                        height={100}
                                        alt={`sprite ${pokemon.name}`}
                                    />
                                    <Image
                                        src={pokemon.sprites.back_default}
                                        width={100}
                                        height={100}
                                        alt={`sprite ${pokemon.name}`}
                                    />
                                </div>
                            </div>
                        </Tab>
                        <Tab label="Shiny Sprites">
                            <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 drop-shadow-lg">
                                <p className="text-sm text-gray-600">Shiny Sprites</p>
                                <div className="flex justify-center">
                                    <Image
                                        src={pokemon.sprites.front_shiny}
                                        width={100}
                                        height={100}
                                        alt={`sprite ${pokemon.name}`}
                                    />
                                    <Image
                                        src={pokemon.sprites.back_shiny}
                                        width={100}
                                        height={100}
                                        alt={`sprite ${pokemon.name}`}
                                    />
                                </div>
                            </div>
                        </Tab>
                        <Tab label="Moves">
                            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 drop-shadow-lg">
                                <p className="text-sm text-gray-600">Moves</p>
                                <div className="flex justify-center">
                                    <div className="flex flex-wrap">
                                        {pokemon.moves.map(move => (
                                            <p key={move.move.name} className="mr-2 capitalize flex flex-wrap">{move.move.name}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
