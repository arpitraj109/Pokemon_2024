import React from "react";
import "./PokemonCard.css";

const PokemonCard = ({ name, image, types = [], stats = [] }) => {
    return (
      <div className="pokemon-card">
        <img src={image} alt={name} className="pokemon-image" />
        <h3 className="pokemon-name">{name}</h3>
        <div className="pokemon-types">
          {types.map((type, index) => (
            <span key={index} className={`type-badge type-${type}`}>
              {type}
            </span>
          ))}
        </div>
        <div className="pokemon-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat">
              <span className="stat-name">{stat.name}:</span>
              <span className="stat-value">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  

export default PokemonCard;
