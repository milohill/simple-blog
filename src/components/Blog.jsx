import React, { useState, useEffect } from 'react';
import Post from './Post';

const Blog = () => {
  useEffect(() => {
    fetchPosts();
  }, []);

  const [posts, setPosts] = useState([]);

  async function fetchPosts() {
    const response = await fetch('http://localhost:3000/api/posts');
    const json = await response.json();
    setPosts(json);
  }

  return (
    <div className="board-content blog">
      {posts.map((el) => (
        <Post obj={el} />
      ))}
    </div>
  );
};

export default Blog;
