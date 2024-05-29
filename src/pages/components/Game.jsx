import React from 'react';

// game component to display on games page, takeing props in from the component and then displaying from json on games page
const Game = ({ image, url, name, description }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <a href={url} target="_blank" rel="noopener noreferrer">
                <img src={image} alt={name} className="w-full h-32 object-cover" />
                <div className="p-4">
                    <h3 className="text-xl font-bold text-blue-600">{name}</h3>
                    <p className="text-gray-700 mt-2">{description}</p>
                </div>
            </a>
        </div>
    );
};

export default Game;
