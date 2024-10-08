import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import '../styles.css'
import { useAuth } from '../contexts/authContext/index'
import { signOut } from 'firebase/auth';

import Card from '../components/Card';
import Pfp from '../components/Pfp';

const Home = () => {
  const { userLoggedIn } = useAuth(); 
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getAllUsers');
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const results = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.officeNumber && user.officeNumber.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className='min-h-screen bg-blue-100 relative'> 
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 z-10">
        <div>
          <button onClick={handleLogout} className="text-sky-500 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
          </button>
        </div>
        <div>
          <a href="/StatusSet"> 
            <Pfp/>
          </a>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mt-16 mb-8">
          <input
            type="text"
            placeholder="Search by name, status, or office number"
            value={searchTerm}
            onChange={handleSearch}
            className="w-4/5 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 p-7">
          {filteredUsers.map((user) => (
            <Card key={user._id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;