import HeaderLogo from './HeaderLogo';
import Nav from './Nav';
import SearchBar from './SearchBar';

const MainContent = () => {
  return (
    <div className="main-content">
      <HeaderLogo />
      <Nav />
      <SearchBar />
    </div>
  );
};

export default MainContent;
