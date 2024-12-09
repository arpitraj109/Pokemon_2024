import axios from "axios";

const BASE_URL="https://pokeapi.co/api/v2";

export const fetchPokemonList = async (limit = 50) => {
    try {
        const response = await axios.get(`${BASE_URL}/pokemon?limit=50`);
      const pokemonList = response.data.results;
  
      // Fetch detailed data for each Pokémon
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
            return {
              id: null,
              name: pokemon.name,
              image: "https://via.placeholder.com/150", // Placeholder image
              types: ["unknown"],
              stats: [],
            };
          }
        })
      );
  
      return detailedData;
    } catch (error) {
      console.error("Failed to fetch Pokémon list:", error);
      return [];
    }
  };
  