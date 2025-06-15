import Image from "next/image";
import Link from "next/link";
import { IoHeartOutline } from "react-icons/io5";

type pokemonProps = {
    pokemon: {
        id: string;
        name: string;
    }
}

export default function PokemonCard({ pokemon }: pokemonProps) {
    return (
        <div className="mx-auto right-0 mt-2 w-60">
            <div className="bg-white rounded overflow-hidden shadow-lg">
                <div className="text-center p-6 bg-gray-800 border-b">
                    <Image className="mx-auto w-38  h-38 "
                        key={pokemon.id}
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                        width={100}
                        height={100}
                        alt={pokemon.name}
                        priority={false}/>
                    <p className="pt-2 text-lg font-semibold text-gray-50 capitalize">{pokemon.name}</p>
                    <p className="text-sm text-gray-100">N°{pokemon.id}</p>
                    <div className="mt-5">
                        <Link href={`/dashboard/pokemons/${pokemon.id}`}
                            className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100 
                            hover:bg-gray-100 hover:text-gray-800">
                            Detalles pokemon
                        </Link>
                    </div>
                </div>
                <div className="">
                    <Link href="/dashboard/main" className="px-4 py-2 hover:bg-gray-100 flex" >
                        <div className="text-red-500">
                            <IoHeartOutline className="w-7 h-7" />
                        </div>
                        <div className="pl-3">
                            <p className="text-sm font-medium text-gray-800 leading-none">
                                No es favorito
                            </p>
                            <p className="text-xs text-gray-500">View your campaigns</p>
                        </div>
                    </Link>
                    
                </div>
            </div>
        </div>
    )
}
