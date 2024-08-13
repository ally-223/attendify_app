import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ProfileImage from '../components/pfp.png';
import { useAuth } from '../contexts/authContext/index'
import { auth } from '../firebaseConfig';
import axios from 'axios';

const StatusSet = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [officeNumber, setOfficeNumber] = useState('');
  const [quote, setQuote] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { userLoggedIn } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (userLoggedIn) {
      const user = auth.currentUser;
      if (user && user.displayName) {
        setName(user.displayName);
      }
    }
  }, [userLoggedIn]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    if (e.target.value !== 'in office') {
      setOfficeNumber('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      name,
      status,
      officeNumber: status === 'in office' ? officeNumber : '',
      quote,
    };
    console.log('Form Data Submitted:', formData);

    try {
      const response = await axios.post('http://localhost:5000/api/saveUserData', formData); 
      console.log('Response from server:', response.data);
      // Navigate to home page after successful submission
      navigate('/');
    } catch (error) {
      console.error('Error saving data:', error);
      // Optionally, you can add some error handling here, like showing an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center py-6 sm:py-12">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-2xl w-full h-full max-h-2xl">
        <img className="w-full h-80 object-cover" src={ProfileImage} alt="Profile" />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>

          {/* Name Display */}
          <div className="mb-4">
            {name || 'Loading...'}
          </div>
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                placeholder="Enter your quote"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div className="mb-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                  isLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                }`}
              > Submit
                {/* {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
                    Submitting...
                  </span>
                ) : 'Submit'} */}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StatusSet;