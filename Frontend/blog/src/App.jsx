import { useState } from 'react';
import './App.css';
// import Register from './components/Register'; // Import the Register component
import Login from './components/Login';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      {/* Display the Register component */}
      {/* <Register/> */}
      <Login/>
    </div>
  );
}

export default App;
