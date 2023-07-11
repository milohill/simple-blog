import { useEffect, useState } from 'react';

const Post = (props) => {
  const { postData } = props;

  // have the function run on the initial rendering
  useEffect(() => {
    fetchComments();
  }, []);

  // format the date object
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const formattedDate = new Date(postData.date).toLocaleDateString(
    'en-US',
    options
  );

  const [comments, setComments] = useState({});

  async function fetchComments() {
    const response = await fetch(
      `http://localhost:3000/api/comments/${postData._id}`
    );
    const json = await response.json();
    setComments(json);
  }

  return (
    <div className="post">
      <div>
        <h2>{postData.title}</h2>
        <div>
          <p>AUTHOR</p>
          <div>{formattedDate}</div>
        </div>
      </div>
      <div>
        {postData.content.length > 15
          ? `${postData.content.slice(0, 15)}...`
          : postData.content}
      </div>
      <div>Comments ({comments.length})</div>
    </div>
  );
};

export default Post;
