import React from 'react';
import ProfileImage from './pfp.png';

const Card = () => {
  return (
    <div className="relative bg-transparent flex flex-col justify-center overflow-hidden py-6 sm:py-12">
      <div className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-24 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
        <span className="absolute top-10 left-1/2 -translate-x-1/2 h-28 w-28 rounded-full bg-sky-500 transition-all duration-300 group-hover:scale-[10]"></span>
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-20">
          <img 
            src={ProfileImage}
            alt="Profile Picture" 
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-md">
          <div className="space-y-6 pt-20 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
            <p>
              Perfect for learning how the framework works, prototyping a new idea, or creating a demo to share online.
            </p>
          </div>
          <div className="pt-5 text-base font-semibold leading-7">
            <p>
              <a href="#" className="text-sky-500 transition-all duration-300 group-hover:text-white">
                Read the docs &rarr;
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;