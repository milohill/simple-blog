import Home from './Home';
import Blog from './Blog';
import About from './About';

const Board = (props) => {
  const { pageState } = props;

  switch (pageState) {
    case 'home':
      return <Home />;
    case 'blog':
      return <Blog />;
    case 'about':
      return <About />;
    default:
      return <div>Error!</div>;
  }
};

export default Board;
