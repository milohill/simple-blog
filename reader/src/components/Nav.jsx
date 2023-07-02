const Nav = (props) => {
  const { handleHomeClick, handleBlogClick, handleAboutClick } = props;
  return (
    <nav>
      <h2>Simple Blog</h2>
      <button onClick={handleHomeClick}>Home</button>
      <button onClick={handleBlogClick}>Blog</button>
      <button onClick={handleAboutClick}>About</button>
    </nav>
  );
};

export default Nav;
