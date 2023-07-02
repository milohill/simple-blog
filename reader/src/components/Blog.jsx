import React, { useState, useEffect } from 'react';
import Post from './Post';
import SearchBar from './SearchBar';

const Blog = () => {
  const [everyPost, setEveryPost] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const response = await fetch('http://localhost:3000/api/posts');
    const json = await response.json();
    setEveryPost(json);
  }

  function filterPosts(value) {
    if (value.length >= 1) {
      const filteredPosts = everyPost.filter(
        (obj) =>
          obj.title.toLowerCase().includes(value.toLowerCase()) ||
          obj.content.toLowerCase().includes(value.toLowerCase())
      );
      setPosts(filteredPosts);
    }
  }

  return (
    <div className="board-content blog">
      <SearchBar func={filterPosts} />
      <div className="post-container">
        {posts.length > 0
          ? posts.map((obj) => <Post obj={obj} />)
          : everyPost.map((obj) => <Post obj={obj} />)}
      </div>
    </div>
  );
};

export default Blog;
