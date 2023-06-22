import { useState } from 'react';
import HeaderLogo from './HeaderLogo';
import Nav from './Nav';
import SearchBar from './SearchBar';
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
      <SearchBar />
      <Board pageState={pageState} />
    </div>
  );
};

export default MainContent;
