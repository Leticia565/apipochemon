// Seleccionamos la API de Pokémon
const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=20";

// Referencias a elementos del DOM
const pokemonListContainer = document.getElementById("pokemon-list");
const selectedPokemonContainer = document.getElementById("selected-pokemon");

// Función para obtener datos de la API
async function fetchPokemon() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    renderPokemonList(data.results);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}

// Renderizar la lista de Pokémon en el DOM
function renderPokemonList(pokemonList) {
  pokemonList.forEach(async (pokemon) => {
    const pokemonData = await fetchPokemonDetails(pokemon.url);

    // Crear elementos dinámicamente
    const card = document.createElement("div");
    card.classList.add("pokemon-card");
    card.innerHTML = `
      <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}" />
      <h3>${capitalize(pokemonData.name)}</h3>
      <p>Height: ${pokemonData.height}</p>
    `;

    // Agregar evento de clic
    card.addEventListener("click", () => {
      addPokemonToSelected(pokemonData);
    });

    // Añadir al contenedor
    pokemonListContainer.appendChild(card);
  });
}

// Función para obtener detalles de un Pokémon
async function fetchPokemonDetails(url) {
  const response = await fetch(url);
  return response.json();
}

// Función para agregar Pokémon al área seleccionada y localStorage
function addPokemonToSelected(pokemon) {
  // Crear tarjeta del Pokémon seleccionado
  const card = document.createElement("div");
  card.classList.add("selected-card");
  card.innerHTML = `
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
    <h3>${capitalize(pokemon.name)}</h3>
    <p>Height: ${pokemon.height}</p>
  `;

  // Limpiar contenedor y agregar la nueva tarjeta
  selectedPokemonContainer.innerHTML = "";
  selectedPokemonContainer.appendChild(card);

  // Guardar en localStorage
  localStorage.setItem("selectedPokemon", JSON.stringify(pokemon));
}

// Función para cargar el Pokémon seleccionado desde localStorage
function loadSelectedPokemon() {
  const savedPokemon = localStorage.getItem("selectedPokemon");
  if (savedPokemon) {
    const pokemon = JSON.parse(savedPokemon);
    addPokemonToSelected(pokemon);
  }
}

// Función para capitalizar nombres
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Inicializar la aplicación
fetchPokemon();
loadSelectedPokemon();
