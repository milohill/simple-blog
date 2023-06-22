import headerLogo from '../assets/images/main-logo.jpg';

const HeaderLogo = () => {
  return (
    <div className="header-logo">
      <img src={headerLogo} alt="header logo" draggable="false" />
    </div>
  );
};

export default HeaderLogo;
