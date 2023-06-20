import React, { useEffect, useState } from 'react';
import Post from './Post';

const Body = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    const response = await fetch('http://localhost:3000/api/posts');
    const json = await response.json();
    setPosts(json);
  };

  return (
    <div className="body">
      <div id="home">
        <div className="container">
          {posts.map((el) => {
            return <Post el={el} />;
          })}
        </div>
      </div>
      <div id="about"></div>
    </div>
  );
};

export default Body;
