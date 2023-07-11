import React, { useState, useEffect } from 'react';
import Post from './Post';
import SearchBar from './SearchBar';

const Blog = () => {
  const [everyPost, setEveryPost] = useState([]);
  const [posts, setPosts] = useState([]);

  // run once when this component is rendered
  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const response = await fetch('http://localhost:3000/api/posts');
      const json = await response.json();
      setEveryPost(json);
    } catch (error) {
      console.log(error);
    }
  }

  function filterPosts(value) {
    if (value.length >= 1) {
      const filteredPosts = everyPost.filter(
        (post) =>
          post.title.toLowerCase().includes(value.toLowerCase()) ||
          post.content.toLowerCase().includes(value.toLowerCase())
      );
      setPosts(filteredPosts);
    } else {
      setPosts(everyPost);
    }
  }

  function mapArray(arr) {
    return arr.map((el) =>
      el.published ? <Post key={el._id} postData={el} /> : undefined
    );
  }

  return (
    <div className="board-content blog">
      <SearchBar func={filterPosts} />
      <div className="post-container">
        {posts.length >= 1 ? mapArray(posts) : mapArray(everyPost)}
      </div>
    </div>
  );
};

export default Blog;
