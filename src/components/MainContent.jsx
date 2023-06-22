import HeaderLogo from './HeaderLogo';
import Nav from './Nav';
import SearchBar from './SearchBar';
import Board from './Board';

const MainContent = () => {
  return (
    <div className="main-content">
      <HeaderLogo />
      <Nav />
      <SearchBar />
      <Board state="blog"/>
    </div>
  );
};

export default MainContent;
