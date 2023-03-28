import React from "react";
import useSWR, { SWRConfig } from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App() {
  return (
    <SWRConfig value={{ fetcher }}>
      <Pokemon />
    </SWRConfig>
  );

  function Pokemon() {
    const url = " https://pokeapi.co/api/v2/pokemon";
    const { data, error } = useSWR(url);

    if (error) {
      return <div>Error...</div>;
    }
    if (!data) {
      return <div>Loading...</div>;
    }

    return <DisplayPokemon pokemon={data} />;
  }

  function DisplayPokemon({pokemon}) {
  return <pre>{JSON.stringify(pokemon, null, 2)}</pre>;

}
}
  
