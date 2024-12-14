import React, { useEffect, useState } from "react";
import { fetchInitialPokemon, fetchPokemonByName } from "./utils/api";
import PokemonCard from "./Components/PokemonCard";
import Header from "./Components/Header";
import "./App.css";

const App = () => {
  const [theme, setTheme] = useState("light");
  const [pokemonList, setPokemonList] = useState([]); // First 50 Pokémon
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState([]); // Filtered/Search Pokémon
  const [error, setError] = useState("");

  // Fetch initial Pokémon on mount
  useEffect(() => {
    const loadInitialPokemon = async () => {
      const pokemons = await fetchInitialPokemon();
      setPokemonList(pokemons);
      setFilteredPokemon(pokemons);
    };

    loadInitialPokemon();
  }, []);

  // Theme toggler
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    document.documentElement.setAttribute(
      "data-theme",
      theme === "light" ? "dark" : "light"
    );
  };

  // Handle search input
  const handleSearch = async (e) => {
    const term = e.target.value.trim().toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      setFilteredPokemon(pokemonList); // Reset to initial Pokémon
      setError("");
      return;
    }

    // Fetch Pokémon dynamically based on search term
    const result = await fetchPokemonByName(term);
    if (result) {
      setFilteredPokemon([result]); // Display matched Pokémon
      setError("");
    } else {
      setFilteredPokemon([]);
      setError("No Pokémon found matching your search.");
    }
  };

  return (
    <div className="app">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a Pokémon..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <div className="pokemon-container">
        {error && <div className="error-message">{error}</div>}
        {filteredPokemon.length > 0 &&
          filteredPokemon.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              types={pokemon.types}
              stats={pokemon.stats}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
