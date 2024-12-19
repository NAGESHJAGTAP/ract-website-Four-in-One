import React from 'react'

const Home = () => {
  return (
    <div>  <div>    <div className='w-full'>
    <img src="/la.jpg" alt="food" className="w-full h-[670px]" />

    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
      <p className="text-black font-bold text-4xl">
        Welcome to the Ultimate Explorer
      </p>
      <p className="text-white text-xl mt-4">
        Explore meals, Banks, Cocktails, and Magical Harry Potter details, all in one place!
      </p>

      
      <button className="mt-6 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-600 transition duration-300">
        Explore Now
      </button>
    </div>
  </div></div></div>
  )
}

export default Home