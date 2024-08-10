import React, { useState, useEffect } from 'react';
import ProfileImage from '../components/pfp.png';
import { useAuth } from '../contexts/authContext/index'
import { auth } from '../firebaseConfig';

const StatusSet = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [officeNumber, setOfficeNumber] = useState('');
  const [quote, setQuote] = useState('');

  const { userLoggedIn } = useAuth();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      status,
      officeNumber: status === 'in office' ? officeNumber : '',
      quote,
    };
    console.log('Form Data Submitted:', formData);
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
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StatusSet;