import React, { useEffect, useState } from 'react';

const Post = (props) => {
  // have the function run on the initial rendering
  useEffect(() => {
    fetchComments();
  }, []);

  // destructure the props object
  const { _id, title, content, author, date } = props.obj;

  // format the date object
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const formattedDate = new Date(date).toLocaleDateString('en-US', options);

  const [comments, setComments] = useState({});

  async function fetchComments() {
    const response = await fetch(`http://localhost:3000/api/comments/${_id}`);
    const json = await response.json();
    setComments(json);
  }

  return (
    <div className="post">
      <div>
        <h2>{title}</h2>
        <div>
          <p>AUTHOR</p>
          <div>{formattedDate}</div>
        </div>
      </div>
      <div>{content.length > 15 ? content.slice(0, 15) + '...' : content}</div>
      <div>Comments ({comments.length})</div>
    </div>
  );
};

export default Post;
