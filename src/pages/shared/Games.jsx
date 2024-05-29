import React from 'react'; // Import React library
import Game from '../components/Game'; // Import Game component
import gameData from '../components/games.json'; // Import game data from JSON file

// Games component
const Games = () => {
    return (     
      <>
          {/* Games Section */}
          <div id="team" className="min-h-screen bg-blue-50 py-10">
            <div className="container mx-auto px-5">
                <div className="flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-8 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-extrabold text-white mb-4">Check Out Our Free Games!</h1>
                    <p className='text-lg text-white mb-8'>Learn so many new things whilst having fun! </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                        {/* Map over gameData and render Game component for each game */}
                        {gameData.map((game, index) => (
                          <Game
                            key={index}
                            image={game.image}
                            url={game.url}
                            name={game.name}
                            description={game.description}
                          />
                        ))}
                    </div>
                </div>
              </div>
            </div>
    </>
  );
};

export default Games; // Export Games component
