import React from 'react';
import ProfileImage from './pfp.png';
import { useNavigate } from 'react-router-dom';


const Pfp = () => {
const history = useNavigate();

  const handleClick = () => {
    history.push('/auth');
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
          <img 
            src={ProfileImage}
            alt="Profile Picture" 
            className="w-14 h-14 rounded-full border-4 shadow-lg"
          />
    </div>
  );
};

export default Pfp;