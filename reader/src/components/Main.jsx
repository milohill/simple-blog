import Home from './Home';
import About from './About';

const Main = (props) => {
  const { boardState } = props;
  if (boardState) {
    return <Home />;
  }
  return <About />;
};

export default Main;
