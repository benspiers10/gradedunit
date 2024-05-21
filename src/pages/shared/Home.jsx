// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import '../shared/css/home.css';
import scoutimg from '../components/assets/images/scouthome.jpg'


const Home = () => {
  return ( 
     <div class="container px-5 py-24 mx-auto">
      <h1 className='text-xl'> Welcome to the Obanshire Scouts!</h1>

    <div class="flex flex-col">
      <div class="h-1 bg-gray-800 rounded overflow-hidden">
        <div class="w-24 h-full bg-indigo-500"></div>
      </div>
      <div class="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
        <h1 class="sm:w-2/5 text-black font-medium title-font text-2xl mb-2 sm:mb-0">How we operate...</h1>
        <p class="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">At the scouts we are determined to help the little ones work out new skills and imporve on already existing ones as well as their confidence! </p>
      </div>
    </div>
    <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
      <div class="p-4 md:w-1/3 sm:mb-0 mb-6">
        <div class="rounded-lg h-64 overflow-hidden">
          <img alt="content" class="object-cover object-center h-full w-full" src={scoutimg} />
        </div>
        <h2 class="text-xl font-medium title-font text-white mt-5">Event 1</h2>
        <p class="text-base leading-relaxed mt-2">EVENTS</p>
        <a class="text-indigo-400 inline-flex items-center mt-3">Learn More
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
      <div class="p-4 md:w-1/3 sm:mb-0 mb-6">
        <div class="rounded-lg h-64 overflow-hidden">
          <img alt="content" class="object-cover object-center h-full w-full" src={scoutimg} />
        </div>
        <h2 class="text-xl font-medium title-font text-white mt-5">Event 2</h2>
        <p class="text-base leading-relaxed mt-2">EVENT </p>
        <a class="text-indigo-400 inline-flex items-center mt-3">Learn More
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
      <div class="p-4 md:w-1/3 sm:mb-0 mb-6">
        <div class="rounded-lg h-64 overflow-hidden">
        <img alt="content" class="object-cover object-center h-full w-full" src={scoutimg} />
        </div>
        <h2 class="text-xl font-medium title-font text-white mt-5">Event 3</h2>
        <p class="text-base leading-relaxed mt-2">EVENT</p>
        <a class="text-indigo-400 inline-flex items-center mt-3">Learn More
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>
    </div>
  );
};

export default Home;