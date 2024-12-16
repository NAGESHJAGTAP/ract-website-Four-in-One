import React, { useEffect, useState } from 'react';

function Meals() {

  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState('');  
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);  


  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
   
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
        const data = await response.json();
        
    
        setMeals(data.meals || []);  
        setLoading(false);
      } catch (error) {
        console.error('Error fetching meals:', error);
        setLoading(false);
      }
    };

    fetchMeals();
  }, [search]);  
  const handleViewRecipeClick = (videoUrl) => {
    setSelectedVideo(videoUrl);  
  };
  const handleCloseModal = () => {
    setSelectedVideo(null);  
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4">
      <div className="text-center mb-8">
        <input
          type="text"
          placeholder="Search for meals"
          value={search}
          onChange={(e) => setSearch(e.target.value)}  
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 rounded-md text-xl"
        />
      </div>

      <h1 className="text-4xl font-bold text-center text-yellow-600 mb-8">
        Welcome to Meals World
      </h1>
      {loading ? (
        <div className="text-center text-2xl text-gray-700">Loading meals...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {meals && meals.length > 0 ? (
            meals.map((meal) => (
              <div key={meal.idMeal} className="bg-white p-4 rounded-lg shadow-lg">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-2xl font-semibold text-gray-800">{meal.strMeal}</h2>
                <p className="text-sm text-gray-600 mt-2">{meal.strInstructions.slice(0, 100)}...</p>
                {meal.strYoutube && (
                  <button
                    onClick={() => handleViewRecipeClick(meal.strYoutube)}
                    className="mt-4 inline-block bg-yellow-500 text-black font-semibold rounded-full py-2 px-6 hover:bg-yellow-600 transition duration-300"
                  >
                    View Recipe
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-xl text-gray-700">No meals found.</p>
          )}
        </div>
      )}
      {selectedVideo && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg relative w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-xl text-gray-700 bg-yellow-500 p-2 rounded-full"
            >
              X
            </button>
            <h2 className="text-2xl font-semibold text-center mb-4">Recipe Video</h2>
            <div className="flex justify-center">
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${new URL(selectedVideo).searchParams.get('v')}`}
                title="Recipe Video"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Meals;
