import React, { useState, useEffect } from "react";

function Cocktail() {
  const [cocktails, setCocktails] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchCocktails = async () => {
      if (search.trim() === "") return; 
      setLoading(true);
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`
        );
        const data = await response.json();
        setCocktails(data.drinks || []); 
      } catch (error) {
        console.error("Error fetching cocktails:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCocktails();
  }, [search]);

  const handleViewRecipeClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <div className="text-center mb-8">
        <input
          type="text"
          placeholder="Search for cocktails"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-3 rounded-md border text-lg"
        />
      </div>

      <h1 className="text-3xl font-bold text-center text-yellow-500 mb-6">
        Welcome to Cocktail World
      </h1>

      {loading ? (
        <div className="text-center text-2xl text-gray-600">Loading...</div>
      ) : cocktails.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cocktails.map((cocktail) => (
            <div
              key={cocktail.idDrink}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={cocktail.strDrinkThumb}
                alt={cocktail.strDrink}
                className="w-full h-40 object-cover rounded-md"
              />
              <h2 className="text-lg font-semibold text-gray-800 mt-4">
                {cocktail.strDrink}
              </h2>
              <p className="text-gray-600 text-sm mt-2">
                {cocktail.strInstructions.slice(0, 80)}...
              </p>
              {cocktail.strVideo && (
                <button
                  onClick={() => handleViewRecipeClick(cocktail.strVideo)}
                  className="bg-yellow-500 mt-4 text-black px-4 py-2 rounded-md"
                >
                  Watch Recipe
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        search && (
          <div className="text-center text-xl text-gray-700">
            No cocktails found for "{search}".
          </div>
        )
      )}

      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md relative w-11/12 md:w-2/3">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-xl font-bold text-gray-700"
            >
              &times;
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${new URL(selectedVideo).searchParams.get(
                "v"
              )}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-64 md:h-96"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cocktail;

