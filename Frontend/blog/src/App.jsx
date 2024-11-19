import { useState } from 'react';
import './App.css';
import Register from './components/Register'; // Import the Register component
import LandingPage from './components/Landingpage';
// import Login from './components/Login';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      {/* Display the Register component */}
      {/* <Register/> */}
      {/* <Login/> */}
      <LandingPage/>
    </div>
  );
}

export default App;
