const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=20";

const pokemonListContainer = document.getElementById("pokemon-list");
const selectedPokemonContainer = document.getElementById("selected-pokemon");

async function fetchPokemon() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    renderPokemonList(data.results);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}

function renderPokemonList(pokemonList) {
  pokemonList.forEach(async (pokemon) => {
    const pokemonData = await fetchPokemonDetails(pokemon.url);
    const card = document.createElement("div");
    card.classList.add("pokemon-card");
    card.innerHTML = `
      <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}" />
      <h3>${capitalize(pokemonData.name)}</h3>
      <p>Height: ${pokemonData.height}</p>
    `;

    card.addEventListener("click", () => {
      addPokemonToSelected(pokemonData);
    });

    pokemonListContainer.appendChild(card);
  });
}

async function fetchPokemonDetails(url) {
  const response = await fetch(url);
  return response.json();
}

function addPokemonToSelected(pokemon) {
  const card = document.createElement("div");
  card.classList.add("selected-card");
  card.innerHTML = `
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
    <h3>${capitalize(pokemon.name)}</h3>
    <p>Height: ${pokemon.height}</p>
  `;

  selectedPokemonContainer.innerHTML = "";
  selectedPokemonContainer.appendChild(card);
  
  localStorage.setItem("selectedPokemon", JSON.stringify(pokemon));
}

function loadSelectedPokemon() {
  const savedPokemon = localStorage.getItem("selectedPokemon");
  if (savedPokemon) {
    const pokemon = JSON.parse(savedPokemon);
    addPokemonToSelected(pokemon);
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
fetchPokemon();
loadSelectedPokemon();
