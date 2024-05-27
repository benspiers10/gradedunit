import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../shared/css/home.css';
import scoutimg from '../components/assets/images/scouthome.jpg';
import scoutsLogo from '../components/assets/images/logocrest.png';

const Home = () => {
  const [randomEvents, setRandomEvents] = useState([]);

  useEffect(() => {
    fetchRandomEvents();
  }, []);

  const fetchRandomEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8081/events');
      // Shuffle the events to get random ones
      const shuffledEvents = response.data.sort(() => Math.random() - 0.5).slice(0, 3);
      setRandomEvents(shuffledEvents);
    } catch (error) {
      console.error('Error fetching random events:', error);
    }
  };

  return ( 
    <div className="relative">
      {/* Hero Image */}
      <div className="relative overflow-hidden h-64 md:h-96">
        <img src={scoutimg} alt="Scout" className="w-full h-full object-cover" />
        {/* Floating Text Box */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-75 text-white p-8 rounded-lg md:max-w-xl">
          <h2 className="text-3xl font-semibold mb-4">Welcome to Obanshire Scouts</h2>
          <div className="border-t border-gray-300 mb-4"></div>
          <p className="text-lg">Join us to discover the world, learn new skills, and make lifelong friendships.</p>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Skills for Life</h3>
            <p className="text-base">At the scouts, we are determined to help the little ones work out new skills and improve on already existing ones as well as their confidence!</p>
          </div>
        </div>
      </div>

      {/* Logo */}
      <div className="absolute top-0 left-0 p-4">
        <img src={scoutsLogo} alt="Scouts Logo" className="w-24" />
      </div>

      {/* Separator */}
      <div className="absolute top-full left-0 w-full">
        <div className="h-1 bg-gray-800 rounded"></div>
      </div>

      {/* Random Events Section */}
      <div className="container px-5 py-12 mx-auto">
        <h1 className='text-2xl font-semibold mb-6 text-left'> Popular Events</h1>
        <div className="flex flex-wrap -m-4">
          {randomEvents.map(event => (
            <div key={event.event_id} className="p-4 md:w-1/3">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={event.eve_img} alt="" className="w-full h-56 object-cover object-center" />
                <div className="p-6">
                  <h2 className="text-xl font-medium title-font text-gray-900 mb-3">{event.title}</h2>
                  <p className="text-base leading-relaxed mb-2">{event.description}</p>
                  <Link to={`/Events/${event.event_id}`} className="text-indigo-400 inline-flex items-center">View Event</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
