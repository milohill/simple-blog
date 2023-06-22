import Home from './Home';
import Blog from './Blog';
import About from './About';

const Board = (props) => {
  const { state } = props;
  if (state !== 'blog') {
    return <Blog />
  }
  return <Home />
};

export default Board;
