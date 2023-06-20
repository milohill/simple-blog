import headerLogo from '../assets/images/main-logo.jpg';

const HeaderLogo = () => {
  return (
    <a className="header-logo" href="/">
      <img src={headerLogo} alt="header logo" />
    </a>
  );
};

export default HeaderLogo;
