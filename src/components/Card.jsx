import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileImage from './pfp.png';
import { useAuth } from '../contexts/authContext';
import { auth } from '../firebaseConfig';

const Card = () => {
  //const { user } = useAuth();
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    console.log('useEffect called', user);
  
    const fetchUserProfile = async () => {
      console.log('fetchUserProfile called', user);
      if (user && user.displayName) {
        try {
          const response = await axios.get(`http://localhost:5000/api/getUserData/${user.displayName}`);
          const { status, quote } = response.data;
          console.log('name', user.displayName);
          console.log('Status', status);
          console.log('quote', quote);
  
          setName(user.displayName || 'User Name');
          setStatus(status || 'User Status');
          setQuote(quote || 'User Quote');
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
        }
      }
    };
  
    fetchUserProfile();
  }, []);
  return (
    <div className="relative bg-transparent flex flex-col justify-center overflow-hidden py-6 sm:py-12">
      <div className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-24 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:rounded-lg sm:px-10" style={{ minWidth: '300px', width: '100%', maxWidth: '384px' }}>
        <span className="absolute top-10 left-1/2 -translate-x-1/2 h-28 w-28 rounded-full bg-sky-500 transition-all duration-300 group-hover:scale-[10]"></span>
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-20">
          <img 
            src={ProfileImage}
            alt="Profile Picture" 
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
        <div className="relative z-10 mx-auto" style={{ width: '100%', maxWidth: '256px' }}>
          <div className="space-y-4 pt-20 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
            <p className="font-bold text-xl text-center">
              {name}
            </p>
            <p className="text-center">
              {status}
            </p>
            <p className="text-center italic break-words">
              "{quote}"
            </p>
          </div>
          <div className="pt-5 text-base font-semibold leading-7">
            {/* You can add additional content here if needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
