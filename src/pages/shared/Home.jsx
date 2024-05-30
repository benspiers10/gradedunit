import { useState, useEffect } from 'react'; // React hooks for managing state and side effects
import { Link } from 'react-router-dom'; // Link component for client-side navigation
import axios from 'axios'; // Axios for making HTTP requests
import '../shared/css/home.css'; // Import custom CSS styles
import scoutimg from '../components/assets/images/scouthome.jpg'; // Import image resources
import scoutsLogo from '../components/assets/images/logocrest.png';
import missionImg from '../components/assets/images/missionImg.png';
import scoutsCommunityImg from '../components/assets/images/scoutsgardening.jpg';
import communityImg from '../components/assets/images/community.jpg';

// Home component
const Home = () => {
  // State to store random events
  const [randomEvents, setRandomEvents] = useState([]);

  // Fetch random events on component mount
  useEffect(() => {
    fetchRandomEvents();
  }, []);

  // Function to fetch random events
  const fetchRandomEvents = async () => {
    try {
      // Fetch events from the server
      const response = await axios.get('http://localhost:8081/events');
      // Shuffle the events to get random ones
      const shuffledEvents = response.data.sort(() => Math.random() - 0.5).slice(0, 3);
      // Set random events in state
      setRandomEvents(shuffledEvents);
    } catch (error) {
      console.error('Error fetching random events:', error);
    }
  };

  // Render home page content
  return (
    <div className="relative">
      {/* Hero Image */}
      <div className="relative overflow-hidden h-80 md:h-[32rem]">
        <img
          src={scoutimg}
          alt="Scout"
          className="w-full h-full object-cover transition-opacity duration-1000 opacity-0 animate-fadeIn"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#006DDF] to-transparent opacity-60"></div>
        {/* Floating Text Box */}
        <div className="absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-75 text-white p-8 rounded-lg md:max-w-xl container mx-auto left-0 right-0">
          <h2 className="text-3xl font-semibold mb-4">Welcome to Obanshire Scouts</h2>
          <div className="border-t border-gray-300 mb-4"></div>
          <p className="text-lg">Join us to discover the world, learn new skills, and make lifelong friendships.</p>
        </div>
      </div>

      {/* Logo */}
      <div className="absolute top-0 left-0 p-4 hidden md:block">
        <img src={scoutsLogo} alt="Scouts Logo" className="w-24" />
      </div>

      {/* New Text Sections */}
      <div className="mt-12 flex flex-wrap bg-[#F2EDE7] p-8 rounded-lg container px-5 py-6 mx-auto">
        <div className="md:w-2/3 pr-4">
          <h2 className="text-3xl font-semibold mb-4">Our Promise and Mission</h2>
          <p className="text-lg mb-4">As Obanshire Scouts, we promise to always be honest, inclusive, and adventurous. We're here to make sure everyone feels safe, has fun, and learns new things. Together, we'll make our community better and create awesome memories.</p>
          <p className="text-lg mb-6">
            At Obanshire Scouts, we're dedicated to empowering young people to grow into confident leaders and active community members. Through exciting adventures and meaningful projects, we foster teamwork, leadership skills, and values like respect and inclusivity. Join us in shaping the next generation of compassionate and capable individuals, ready to make a positive impact wherever life takes them.
          </p>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Skills for Life</h3>
            <p className="text-base">At the scouts, we are determined to help the little ones work out new skills and improve on already existing ones as well as their confidence!</p>
          </div>
        </div>
        <div className="md:w-1/3">
          <img src={missionImg} alt="Mission" className="w-full h-full object-cover rounded-lg" />
        </div>
      </div>

      {/* Random Events Section on refresh, picks random 3 to display*/}
      <div className="container px-5 py-12 mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-left">Popular Events</h1>
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

      {/* Community and Scouts Info as Clickable Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 container px-5 py-12 mx-auto">
        <a href="https://obancommunitycouncil.wordpress.com/" target="_blank" rel="noopener noreferrer" className="block bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <img src={communityImg} alt="Obanshire Community" className="w-full h-56 object-cover object-center" />
          <div className="p-8">
            <h2 className="text-3xl font-semibold mb-4">Obanshire Community</h2>
            <p className="text-lg mb-6">
              Welcome to our vibrant Obanshire community! Here, we celebrate the diversity, spirit, and unity that make our community special. From local events and initiatives to opportunities for collaboration and support, we're committed to fostering connections and making a positive difference. Join us in building a stronger, more inclusive community where everyone belongs and thrives.
            </p>
          </div>
        </a>

          <a href="https://www.scouts.org.uk/about-us/our-campaigns/community/protecting-our-environment/" target="_blank" rel="noopener noreferrer" className="block bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img src={scoutsCommunityImg} alt="Scouts Community" className="w-full h-56 object-cover object-center" />
            <div className="p-8">
              <h2 className="text-3xl font-semibold mb-4">What Scouts Do for the Enviroment</h2>
              <p className="text-lg mb-6">
                In collaboration with WWF, Scouts UK have partnered to tackle environmental issues and help the kids understand what our earth needs for us to do, in order for the planet to love us back! There are tonnes of new ways to help with badges being associated them, please check out WWF and The scouts.uk campaign to see how you can help out!
              </p>
            </div>
          </a>
        </div>
      </div>


    
  );
};

export default Home; //exporting home
