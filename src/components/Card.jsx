import React from 'react';
import ProfileImage from './pfp.png';

const Card = ({ user }) => {
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'away':
        return 'bg-gray-400';
      case 'in office':
        return 'bg-teal-600';
      case 'at home':
        return 'bg-sky-600';
      default:
        return 'bg-sky-500';
    }
  };

  const statusColor = getStatusColor(user.status);

  return (
    <div className="flex justify-center items-center h-[400px]">
      <div className={`w-full max-w-[384px] h-full bg-white shadow-xl ring-1 ring-gray-900/5 rounded-lg overflow-hidden relative group`}>
        <span className={`absolute top-10 left-1/2 -translate-x-1/2 h-28 w-28 rounded-full ${statusColor} transition-all duration-300 group-hover:scale-[10]`}></span>
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-20">
          <img
            src={ProfileImage}
            alt="Profile Picture"
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
        <div className="relative z-10 px-6 pt-40 pb-8 h-full flex flex-col justify-between">
          <div className="space-y-4 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
            <p className="font-bold text-xl text-center">
              {user.name}
            </p>
            <p className="text-center">
              Status: {user.status}
            </p>
            {user.officeNumber && (
              <p className="text-center">
                Office: {user.officeNumber}
              </p>
            )}
            <p className="text-center italic break-words">
              "{user.quote}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;