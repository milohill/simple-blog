const Nav = (props) => {
  const { handleHomeClick, handleBlogClick, handleAboutClick } = props;
  return (
    <nav>
      <button onClick={handleHomeClick}>Home</button>
      <button onClick={handleBlogClick}>Blog</button>
      <button onClick={handleAboutClick}>About</button>
    </nav>
  );
};

export default Nav;
