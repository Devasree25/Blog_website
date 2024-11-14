import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Register from './components/Register'; // Import the Register component

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      {/* Display the Register component */}
      <Register/>
    </div>
  );
}

export default App;
