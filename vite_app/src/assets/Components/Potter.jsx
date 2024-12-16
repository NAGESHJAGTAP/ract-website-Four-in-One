import React, { useState, useEffect } from "react";

function Potter() {
  const [characters, setCharacters] = useState([]);
  const [houses, setHouses] = useState([]);
  const [spells, setSpells] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState("");
  const [error, setError] = useState("");

 
  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://hp-api.onrender.com/api/characters");
        const data = await response.json();
        setCharacters(data);
        setError("");
      } catch (err) {
        console.error("Error fetching characters:", err);
        setError("Failed to load characters.");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);


  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await fetch("https://hp-api.onrender.com/api/characters/house/gryffindor");
        const data = await response.json();
        setHouses(data);
        setError("");
      } catch (err) {
        console.error("Error fetching houses:", err);
        setError("Failed to load houses.");
      }
    };

    fetchHouses();
  }, []);


  useEffect(() => {
    const fetchSpells = async () => {
      try {
        const response = await fetch("https://hp-api.onrender.com/api/spells");
        const data = await response.json();
        setSpells(data);
        setError("");
      } catch (err) {
        console.error("Error fetching spells:", err);
        setError("Failed to load spells.");
      }
    };

    fetchSpells();
  }, []);

 
  const filteredCharacters = selectedHouse
    ? characters.filter((character) => character.house === selectedHouse)
    : characters;

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6">
        Harry Potter World
      </h1>

      {loading && <p className="text-center text-lg text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="w-full max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md">
       
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Select a House
          </label>
          <select
            value={selectedHouse}
            onChange={(e) => setSelectedHouse(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">All Houses</option>
            <option value="Gryffindor">Gryffindor</option>
            <option value="Hufflepuff">Hufflepuff</option>
            <option value="Ravenclaw">Ravenclaw</option>
            <option value="Slytherin">Slytherin</option>
          </select>
        </div>

 
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">Characters</h2>
          {filteredCharacters.length > 0 ? (
            <ul className="space-y-4">
              {filteredCharacters.map((character) => (
                <li
                  key={character.name}
                  className="flex items-center bg-gray-100 p-4 rounded-md shadow"
                >
                  <img
                    src={character.image || "https://via.placeholder.com/80"}
                    alt={character.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{character.name}</h3>
                    <p className="text-gray-600">{character.house || "No House"}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 mt-4">No characters found.</p>
          )}
        </div>

  
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">Spells</h2>
          {spells.length > 0 ? (
            <ul className="space-y-2">
              {spells.slice(0, 10).map((spell) => (
                <li
                  key={spell.name}
                  className="bg-gray-100 p-4 rounded-md shadow"
                >
                  <h3 className="text-lg font-semibold">{spell.name}</h3>
                  <p className="text-gray-600">{spell.description || "No description"}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 mt-4">No spells found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Potter;
