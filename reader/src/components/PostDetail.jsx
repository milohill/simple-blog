import React from 'react';
import dayjs from 'dayjs';

const PostDetail = (props) => {
  const { handleReturnClick } = props;
  const { postDetailData } = props;

  const dateText = postDetailData.updatedAt ? 'Updated' : 'Created';
  const daysPassed = dayjs(new Date()).diff(
    new Date(postDetailData.updatedAt || postDetailData.createdAt),
    'day'
  );

  return (
    <div className="post-detail">
      <button
        className="post-detail__return-button"
        onClick={handleReturnClick}
      >
        Return
      </button>
      <div className="post-detail__container">
        <div className="post-detail__header">
          <div className="post-detail__title">{postDetailData.title}</div>
          <div className="post-detail__metadata">
            <div className="post-detail__author">
              {postDetailData.author.name}
            </div>
            <div className="post-detail__date">{`${dateText} ${daysPassed} ${
              daysPassed > 1 ? 'days' : 'day'
            } ago`}</div>
          </div>
        </div>
        <div className="post-detail__content">{postDetailData.content}</div>
      </div>
      <div className="post-detail__comment-container">
        <h2>Comments</h2>
        {postDetailData.comments.length === 0 ? (
          <div>-none-</div>
        ) : (
          postDetailData.comments.map((comment) => (
            <div className="post-detail__comment">
              <div>{dayjs(comment.createdAt).format('DD/MM/YYYY')}</div>
              <div>{comment.content}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostDetail;
