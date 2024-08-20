import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ProfileImage from '../components/pfp.png';
import { useAuth } from '../contexts/authContext/index'
import { auth } from '../firebaseConfig';
import axios from 'axios';
import { upload } from '../firebaseConfig';

const StatusSet = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [officeNumber, setOfficeNumber] = useState('');
  const [quote, setQuote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState();
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);

  
  const { userLoggedIn, currentUser } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.displayName || '');
      setProfileImage(currentUser.photoURL || ProfileImage);
    }
  }, [currentUser]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    if (e.target.value !== 'in office') {
      setOfficeNumber('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      let photoURL = currentUser.photoURL; // Get the current photoURL
  
      if (photo) {
        // If a new photo was selected, upload it
        const uploadedPhotoURL = await upload(photo, currentUser, setLoading);
        if (uploadedPhotoURL) {
          photoURL = uploadedPhotoURL; // Update photoURL if upload was successful
        }
      }
  
      const formData = {
        name,
        status,
        officeNumber: status === 'in office' ? officeNumber : '',
        quote,
        photoURL, // Include the photoURL in the form data
        lastSubmitTime: new Date().toLocaleString()
      };
  
      const response = await axios.post('http://localhost:5000/api/saveUserData', formData);
      console.log('Response from server:', response.data);
      console.log('Last form submission time:', formData.lastSubmitTime);
      navigate('/home');
    } catch (error) {
      console.error('Error saving data:', error);
      alert("An error occurred while saving data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  function handleImageUpload(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
      setProfileImage(URL.createObjectURL(e.target.files[0])); // This will show a preview
    }
  }

  return (
    <div className="flex justify-center py-6 sm:py-12">
       {/* Back Button */}
       <button 
        onClick={() => navigate('/')} 
        className="z-50 absolute top-4 left-4 bg-sky-500 hover:bg-sky-600 text-white rounded-full p-2 m-3"
                  >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-2xl w-full h-full max-h-2xl">
        <div className="relative">
          <img className="w-full h-80 object-cover" src={profileImage} alt="Profile" />
          <label htmlFor="profile-upload" className="absolute bottom-4 right-4 bg-sky-500 hover:bg-sky-600 text-white rounded-full p-2 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>
        <div className="p-4">
          {/* Name Display */}
          <h2 className="text-xl font-semibold mb-4 text-sky-600">Hi { name || 'Loading...'}!</h2>

        
          <form onSubmit={handleSubmit}>
            {/* Status Field */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={handleStatusChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
              >
                <option value="">Select your status</option>
                <option value="in office">In Office</option>
                <option value="at home">At Home</option>
                <option value="away">Away</option>
              </select>
            </div>

            {/* Office Number Field (conditional) */}
            {status === 'in office' && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="officeNumber">
                  Office Number
                </label>
                <input
                  id="officeNumber"
                  type="text"
                  value={officeNumber}
                  onChange={(e) => setOfficeNumber(e.target.value)}
                  placeholder="Enter your office number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
            )}

            {/* Quote Field */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="quote">
                Quote
              </label>
              <textarea
                id="quote"
                rows="3"
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="Enter your quote of the day or leave a message for your coworkers!"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>

            {/* Submit Button */}
            <div className="mb-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 ${
                  isLoading ? 'bg-sky-300 cursor-not-allowed' : 'bg-sky-500 hover:bg-sky-600'
                }`}
              > Submit
              
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StatusSet;