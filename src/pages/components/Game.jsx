import React from 'react';
import { Link } from 'react-router-dom';

const Game = ({ image, url, name, description }) => (
  <div className="col-span-12 sm:col-span-6 md:col-span-4 p-3">
    <Link to={url} target='_blank' className="block">
      <div className="w-full rounded-lg overflow-hidden shadow-md bg-white">
        <div className="relative">
          <img src={image} alt="game" className="w-full h-auto" />
        </div>
        <div className="p-4">
          <p className="text-gray-800 text-lg font-semibold mb-2">{name}</p>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </Link>
  </div>
);

export default Game;
