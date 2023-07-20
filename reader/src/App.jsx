import './App.css';
import { useState } from 'react';
import Nav from './components/Nav';
import Main from './components/Main';
import Footer from './components/Footer';
import './components/style.css';

const App = () => {
  const [boardState, setBoardState] = useState(true);

  function handleHomeClick() {
    setBoardState(true);
  }

  function handleAboutClick() {
    setBoardState(false);
  }

  return (
    <div className="app">
      <Nav
        handleHomeClick={handleHomeClick}
        handleAboutClick={handleAboutClick}
      />
      <Main boardState={boardState} />
      <Footer />
    </div>
  );
};

export default App;
