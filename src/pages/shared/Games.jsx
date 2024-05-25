import React from 'react';
import Game from '../components/Game';
import gameData from '../components/games.json';

const Games = () => {
    return (     
      <>
          <div id="team" className="section relative">
            <div className="container xl:max-w-6xl mx-auto">
                <div className="flex flex-col p-5 bg-green-900 items-center justify-center">
                    <h1 className="text-white">Check out our free BBC BiteSize Games here!</h1>
                    <p className='text-white'>Learn so many new things!</p>
                  <div className="grid grid-cols-12 gap-2 gap-y-4 max-w-6xl px-3">   
                    {/* <!-- game 1 --> */}
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

export default Games;