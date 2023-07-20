const Nav = (props) => {
  const { handleHomeClick, handleAboutClick } = props;
  return (
    <>
      <nav className="nav">
        <div className="nav__home-button" onClick={handleHomeClick}>
          Simple
        </div>
        <div className="nav__about-button" onClick={handleAboutClick}>
          About
        </div>
      </nav>
    </>
  );
};

export default Nav;
