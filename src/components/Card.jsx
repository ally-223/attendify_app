import React from 'react';
import DefaultProfileImage from './pfp.png';

const Card = ({ user }) => {
  //console.log(user)
  const getStatusColors = (status) => {
    //console.log({status});
    if (status) {
      switch(status.toLowerCase()) {
        case 'away':
          return { bg: 'bg-gray-400', border: 'border-gray-400', text:'text-gray-400' };
        case 'in office':
          return { bg: 'bg-teal-600', border: 'border-green-600', text:'text-green-600'  };
        case 'at home':
          return { bg: 'bg-sky-600', border: 'border-blue-500', text:'text-blue-500'  };
        default:
          return { bg: 'bg-sky-500', border: 'border-white', text:'text-gray-400'  };
      }
    }
    return { bg: 'bg-sky-500', border: 'border-gray-300' };
  };

  const { bg: statusColor, border: borderColor, text: textColor} = getStatusColors(user.status);

  // Use the user's photoURL if available, otherwise use the default image
  const profileImageSrc = user.photoURL || DefaultProfileImage;
  console.log(user.photoURL);

  return (
    <div className="flex justify-center items-center h-[400px]">
      <div className={`w-full max-w-[384px] h-full bg-white shadow-xl ring-1 ring-gray-900/5 rounded-lg overflow-hidden relative group`}>
        <span className={`absolute top-10 left-1/2 -translate-x-1/2 h-28 w-28 rounded-full ${statusColor} transition-all duration-300 group-hover:scale-[10]`}></span>
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-20">
          <img
            src={profileImageSrc}
            alt="Profile Picture"
            className={`w-28 h-28 rounded-full border-4 ${borderColor} shadow-lg object-cover`}
          />
        </div>
        <div className="relative z-10 px-6 pt-40 pb-8 h-full flex flex-col justify-between">
          <div className="space-y-4 text-base leading-7 text-gray-600">
            <p className="font-bold text-xl text-center group-hover:text-white/90 transition-all duration-300">
              {user.name}
            </p>
            <p className={`text-center ${textColor} group-hover:text-white/90 transition-all duration-300`}>
              Status: {user.status}
            </p>
            {user.officeNumber && (
              <p className="text-center group-hover:text-white/90 transition-all duration-300">
                Office: {user.officeNumber}
              </p>
            )}
            <p className="text-center italic break-words group-hover:text-white/90 transition-all duration-300">
              "{user.quote}"
            </p>
          </div>
          <div className="mt-4 text-sm text-gray-500 text-center">
          {user.lastSubmitTime ? (
            `Last updated: ${user.lastSubmitTime}`
          ) : (
            'No last update time available'
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Card;