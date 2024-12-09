import React, { useEffect, useState } from "react";
import { fetchPokemonList } from "./utils/api";
import PokemonCard from "./Components/PokemonCard";
import Header from "./Components/Header";
import "./App.css";

const App=()=>{
  const[theme,setTheme]=useState("light");
  const [pokemonList,setPokemonList]=useState([]);
  const [searchTerm,setSearchTerm]=useState("");
  const[filteredPokemon,setFilteredPokemon]=useState([]);
  const [error,setError]=useState("");

  useEffect(() => {
    const loadPokemon = async () => {
    try{
      const pokemons = await fetchPokemonList();
      console.log("Fetched Pokémon Data:", pokemons); // Debugging
      setPokemonList(pokemons);
      setFilteredPokemon(pokemons);
    }
    catch(error)
    {
      setError("Failed to load Pokémon. Please try again.");
    }
    };
    loadPokemon();
  }, []);
  
  const toggleTheme=()=>{
    setTheme((prevTheme)=>(prevTheme==="light"?"dark":"light"));
    document.documentElement.setAttribute(
      "data-theme",
      theme === "light" ? "dark" : "light"
    );
  };

  const handleSearch=(e)=>{
    const term=e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if(term.trim()==="")
    {
      setFilteredPokemon(pokemonList);
      setError("");
    }
    else{
      const filtered =pokemonList.filter((pokemon)=>
      pokemon.name.toLowerCase().includes(term));

      setFilteredPokemon(filtered);
      if(filtered.length===0)
      {
        setError("No Pokémon found matching your search.");
      }
      else{
        setError("");
      }
    }
  };

  return(
    <div className="app">
      <Header theme={theme} toggleTheme={toggleTheme}></Header>
      <div className="search-bar">
        <input
        type="text"
        placeholder="Search for a Pokémon...."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
        ></input>
      </div>
      <div className="pokemon-container">
        {error && <div className="error-mesaage">{error}</div>}
        {filteredPokemon && filteredPokemon.map((pokemon)=>(
          <PokemonCard 
          key={pokemon.id}
          name={pokemon.name}
          image={pokemon.image}
          types={pokemon.types}
          stats={pokemon.stats}
          />
        ))};
      </div>
    </div>
  );
};


export default App;