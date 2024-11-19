import { useState } from 'react';
import './App.css';
import Register from './components/Register'; // Import the Register component
import Login from './components/Login'; // Import the Login component
import LandingPage from './components/Landingpage'; // Import the LandingPage component

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      {/* Display the Login component */}
      <Login/>
      {/* Uncomment below to display Register component */}
      {/* <Register/> */}
      {/* Uncomment below to display LandingPage component */}
      {/* <LandingPage/> */}
    </div>
  );
}

export default App;
