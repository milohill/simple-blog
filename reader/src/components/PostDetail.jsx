import React from 'react';

const PostDetail = (props) => {
  const { handleGoBackClick } = props;
  const { postDetailData } = props;
  console.log(postDetailData);

  return (
    <div>
      PostDetail<button onClick={handleGoBackClick}>GO BACK</button>
    </div>
  );
};

export default PostDetail;
