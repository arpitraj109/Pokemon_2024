import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchInitialPokemon = async () => {
  try {
    // Fetch the first 50 Pokémon
    const response = await axios.get(`${BASE_URL}/pokemon?limit=50`);
    const pokemonList = response.data.results;

    // Fetch details for these Pokémon
    const detailedData = await Promise.all(
      pokemonList.map(async (pokemon) => {
        try {
          const details = await axios.get(pokemon.url);
          return {
            id: details.data.id,
            name: details.data.name,
            image: details.data.sprites?.front_default || "https://via.placeholder.com/150",
            types: details.data.types.map((type) => type.type.name),
            stats: details.data.stats.map((stat) => ({
              name: stat.stat.name,
              value: stat.base_stat,
            })),
          };
        } catch (error) {
          console.error(`Failed to fetch details for ${pokemon.name}:`, error);
          return null;
        }
      })
    );

    return detailedData.filter((pokemon) => pokemon !== null); // Exclude failed Pokémon
  } catch (error) {
    console.error("Failed to fetch initial Pokémon:", error);
    return [];
  }
};

export const fetchPokemonByName = async (searchTerm) => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${searchTerm.toLowerCase()}`);
    const details = response.data;

    return {
      id: details.id,
      name: details.name,
      image: details.sprites?.front_default || "https://via.placeholder.com/150",
      types: details.types.map((type) => type.type.name),
      stats: details.stats.map((stat) => ({
        name: stat.stat.name,
        value: stat.base_stat,
      })),
    };
  } catch (error) {
    console.error(`Failed to fetch Pokémon with name "${searchTerm}":`, error);
    return null; // Return null if Pokémon not found
  }
};
