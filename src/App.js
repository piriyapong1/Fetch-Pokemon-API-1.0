import React from "react";
import "./styles.css";

// fetch 150 pokemon https://pokeapi.co/api/v2/pokemon?limit=150

export default function App() {
  const [allPokemon, setAllPokemon] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const [displayResults, setDisplayResults] = React.useState(false);
  const [image, setImage] = React.useState("");
  // const [filter, setFilter] = React.useState("");
  // const [selectedPokemon, setSelectedPokemon] = React.useState("");

  React.useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=250")
      .then((resp) => resp.json())
      .then((resp) => setAllPokemon(resp.results));
  }, []);

  const setInput = (value) => setInputValue(value);

  const changeHandler = (event) => {
    setInput(event.target.value);
    setDisplayResults(
      !allPokemon.find((pokemon) => pokemon.name === event.target.value)
    );
  };

  const setPokemon = (name) => {
    setDisplayResults(false);
    setInput(name);
  };

  const fetchImg = () => {
    console.log(`https://pokeapi.co/api/v2/${inputValue}`);
    if (inputValue) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
        .then((resp) => resp.json())
        .then((resp) => {
          console.log(
            "resp.sprites",
            `https://pokeapi.co/api/v2/pokemon/${inputValue}`
          );
          const keys = Object.keys(resp.sprites).filter(
            (key) => key !== "other" && key !== "versions"
          );
          const imageResults = [];
          keys.forEach((key) => {
            if (resp.sprites[key]) {
              imageResults.push(resp.sprites[key]);
            }
          });
          setImage(imageResults);
        })
        .catch((error) => console.log("Pokemon not found"));
    }
  };

  return (
    <div className="App">
      <div className="pokemonHeaderImageContainer">
        <img
          className="pokemonHeaderImage"
          src="../pokemon.png"
          alt="pokeball"
        />
      </div>
      <div className="title">
        <span>Fetch Pokemon API</span>
      </div>
      <div>
        <div className="container">
          <div className="autocomplete">
            <input
              className="searchInput"
              type="text"
              value={inputValue}
              onChange={changeHandler}
              placeholder="Search for a pokemon here..."
            />
            <div className={"searchItemsContainer"}>
              {displayResults &&
                inputValue.length > 0 &&
                allPokemon
                  .filter((pokemon) => pokemon.name.indexOf(inputValue) === 0)
                  .map((pokemon) => (
                    <div
                      className="searchItem"
                      key={pokemon.name}
                      onClick={() => setPokemon(pokemon.name)}
                    >
                      {pokemon.name}
                    </div>
                  ))}
            </div>
          </div>
          <button className="fetchButton" onClick={fetchImg}>
            Fetch
          </button>
        </div>
      </div>
      {image && (
        <div className="imgContainer">
          {image.map((img, index) => (
            <div>
              <img
                key={index}
                className="pokemonImg"
                src={img}
                alt={`pokemon-${index}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
