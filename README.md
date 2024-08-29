
# 📝 Attendance Web Application - Frontend

This is the frontend of the Attendance Web Application built using React. It handles the user interface and interactions with the backend API.

## 📦 Project Setup

To set up and run the frontend application locally, follow these steps:

### Prerequisites

- Node.js and npm installed on your machine
- A modern web browser

### 🔧 Installation

1. **Clone the Repository**  
   Clone the repository to your local machine using:
   ```bash
   git clone https://github.com/your-username/attendance-frontend.git
   ```

2. **Navigate to the Project Directory**  
   Move into the project directory:
   ```bash
   cd attendance-frontend
   ```

3. **Install Dependencies**  
   Install the required dependencies using npm:
   ```bash
   npm install
   ```

### 🔑 Firebase Setup

The frontend uses Firebase for authentication. You need to set up Firebase to use the application:

1. **Create a Firebase Project**  
   Go to the Firebase Console and create a new project.

2. **Add a Web App**  
   Add a web app to your Firebase project to get the Firebase configuration.

3. **Update Firebase Configuration**  
   Create a `.env` file in the root of the project and add your Firebase configuration details:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

### 🌐 MongoDB Atlas Setup

The frontend interacts with a MongoDB Atlas database for user data storage:

1. **Set Up a MongoDB Atlas Cluster**  
   Go to MongoDB Atlas and set up a cluster.

2. **Get the Connection String**  
   Retrieve your connection string and update it in the backend `.env` file.

### 🚀 Running the Application

1. **Start the Development Server**  
   Start the development server with the following command:
   ```bash
   npm run dev
   ```

2. **Access the Application**  
   Open your browser and go to:
   ```arduino
   http://localhost:3000
   ```

## 🛠️ Available Scripts

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production.

## 📚 Technologies Used

- React
- React Router
- Context API for authentication
- Firebase for user authentication
- MongoDB Atlas for database

## 🌐 API Endpoints

This frontend communicates with the backend API, which provides endpoints for user authentication and data management.
