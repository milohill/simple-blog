import { useState } from 'react';
import HeaderLogo from './HeaderLogo';
import Nav from './Nav';
import Board from './Board';

const MainContent = () => {
  const [pageState, setPageState] = useState('home');

  function handleHomeClick() {
    setPageState('home');
  }

  function handleBlogClick() {
    setPageState('blog');
  }

  function handleAboutClick() {
    setPageState('about');
  }

  return (
    <div className="main-content">
      <HeaderLogo />
      <Nav
        handleHomeClick={handleHomeClick}
        handleBlogClick={handleBlogClick}
        handleAboutClick={handleAboutClick}
      />
      <Board pageState={pageState} />
    </div>
  );
};

export default MainContent;
