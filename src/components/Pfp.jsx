import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileImage from './pfp.png';
import { useAuth } from '../contexts/authContext/index'

const Pfp = () => {
  const navigate = useNavigate(); // Note: It's 'navigate', not 'history' in react-router-dom v6
  const { currentUser } = useAuth(); // Assuming your auth context provides a currentUser object

  const profileImageSrc = currentUser?.photoURL || ProfileImage;

  const handleClick = () => {
    navigate('/auth'); // Use 'navigate' instead of 'history.push'
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <img 
        src={profileImageSrc}
        alt="Profile Picture" 
        className="w-14 h-14 rounded-full border-4 shadow-lg"
      />
    </div>
  );
};

export default Pfp;