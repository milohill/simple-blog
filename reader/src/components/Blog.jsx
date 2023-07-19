import { useState, useEffect } from 'react';
import Post from './Post';
import SearchBar from './SearchBar';
import PostDetail from './PostDetail';

const Blog = () => {
  // run once when this component is rendered
  useEffect(() => {
    fetchEveryPost();
  }, []);

  const [everyPost, setEveryPost] = useState([]);
  const [posts, setPosts] = useState([]);

  const [postState, setPostState] = useState(true);
  const [postDetailData, setPostDetailData] = useState({});

  function handlePostClick(data) {
    setPostDetailData(data);
    setPostState(false);
  }

  function handleReturnClick() {
    setPostState(true);
  }

  async function fetchEveryPost() {
    try {
      const response = await fetch('http://localhost:3000/api/posts');
      const jsonPosts = await response.json();
      setEveryPost(jsonPosts);
    } catch (err) {
      console.log(err);
      // error handling how?
    }
  }

  function filterPosts(keyword) {
    // if there's a value typed in the search bar
    if (keyword.length >= 1) {
      const filteredPosts = everyPost.filter(
        (postObj) =>
          postObj.title.toLowerCase().includes(keyword.toLowerCase()) ||
          postObj.content.toLowerCase().includes(keyword.toLowerCase())
      );
      setPosts(filteredPosts);
    } else {
      setPosts(everyPost);
    }
  }

  function mapArray(arr) {
    return arr.map((postData) => {
      if (postData.ifPublished) {
        return <Post postData={postData} handlePostClick={handlePostClick} />;
      }
    });
  }

  // if true display a list of posts, if false display a post detail
  if (postState) {
    return (
      <div className="board-content blog">
        <SearchBar filterPosts={filterPosts} />
        <div className="post-container">
          {posts.length >= 1 ? mapArray(posts) : mapArray(everyPost)}
        </div>
      </div>
    );
  }
  return (
    <PostDetail
      handleReturnClick={handleReturnClick}
      postDetailData={postDetailData}
    />
  );
};

export default Blog;
