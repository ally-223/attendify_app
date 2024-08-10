import React, { useEffect } from 'react';
import NavBar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import '../styles.css'
import { useAuth } from '../contexts/authContext/index'
import { signOut } from 'firebase/auth';

import Card from '../components/Card';
import Pfp from '../components/Pfp';




const Home = () => {
  const { userLoggedIn } = useAuth(); // Assuming you have userLoggedIn context

  useEffect(() => {
    if (userLoggedIn) {
      const user = auth.currentUser;

      // User's information
      const name = user.displayName; // User's display name
      const email = user.email; // User's email
      const uid = user.uid; // User's unique ID

      console.log(`Name: ${name}, Email: ${email}, UID: ${uid}`);
    } else {
      console.log("No user is currently logged in.");
    }
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  // Sample data for multiple cards
  const cardData = [
    { id: 1, imageSrc: "path/to/image1.jpg", title: "Card 1" },
    { id: 2, imageSrc: "path/to/image2.jpg", title: "Card 2" },
    { id: 3, imageSrc: "path/to/image3.jpg", title: "Card 3" },
    { id: 4, imageSrc: "path/to/image4.jpg", title: "Card 4" },
    { id: 5, imageSrc: "path/to/image5.jpg", title: "Card 5" },
    { id: 6, imageSrc: "path/to/image6.jpg", title: "Card 6" },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className='min-h-screen bg-blue-100'> 
    <div className="absolute top-3 right-4 z-10">
    <a href="/StatusSet"> 
        <Pfp/>
    </a>
    </div> 

    <div className="absolute top-5 left-4 z-10">
      <button onClick={handleLogout} className="text-sky-500 hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
        </svg>
      </button>
    </div>


      <div className="container mx-auto px-4 py-8 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 p-7 ">
          {cardData.map((card) => (
            <Card key={card.id} imageSrc={card.imageSrc}>
              <h1 className="text-xl font-semibold">{card.title}</h1>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
