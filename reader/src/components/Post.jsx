import { useEffect, useState } from 'react';

const Post = (props) => {
  const { postData } = props;
  const { handlePostClick } = props;

  // format the date object
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
  };

  const formattedDate = new Date(
    postData.updatedAt || postData.createdAt
  ).toLocaleDateString('en-US', options);

  return (
    <div
      className="post"
      onClick={() => {
        handlePostClick(postData);
      }}
    >
      <div>
        <h2>{postData.title}</h2>
        <div>
          <p>{postData.author.name}</p>
          <div>{formattedDate}</div>
        </div>
      </div>
      <div>
        {postData.content.length > 15
          ? `${postData.content.slice(0, 15)}...`
          : postData.content}
      </div>
      <div>Comments ({postData.comments.length})</div>
    </div>
  );
};

export default Post;
