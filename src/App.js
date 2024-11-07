import './App.css';
import Home from './Home.js';
import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <div className="App fixed-background">
      <Navbar />
      <div className="container"> 
        <div className="home-frame">
          <Home />
        </div>
      </div>
    </div>
  );
}

export default App;
