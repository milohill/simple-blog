import React, { useEffect, useState } from 'react';

const Post = (props) => {
  // destructure the props object
  const { _id, title, content, author, date } = props.el;

  // format the date object
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const formattedDate = new Date(date).toLocaleDateString('en-US', options);

  // have the function run on the initial rendering
  useEffect(() => {
    fetchComments();
  }, []);

  const [comments, setComments] = useState({});

  const fetchComments = async () => {
    const response = await fetch(`http://localhost:3000/api/comments/${_id}`);
    const json = await response.json();
    setComments(json);
  };

  return (
    <div className="post">
    </div>
  );
};

export default Post;
