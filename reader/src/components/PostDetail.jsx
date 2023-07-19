import React from 'react';
import dayjs from 'dayjs';
import DOMPurify from 'dompurify';

const PostDetail = (props) => {
  const { postDetailData, handleReturnClick } = props;

  const dateText = postDetailData.updatedAt ? 'Updated' : 'Created';
  const daysPassed = dayjs(new Date()).diff(
    new Date(postDetailData.updatedAt || postDetailData.createdAt),
    'day'
  );
  const formURL = `http://localhost:3000/api/posts/${postDetailData._id}/comments/create`;

  const sanitizedContentData = DOMPurify.sanitize(postDetailData.content);

  return (
    <div className="post-detail">
      <button className="button--small" onClick={handleReturnClick}>
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
        <div
          className="post-detail__content"
          dangerouslySetInnerHTML={{ __html: sanitizedContentData }}
        />
      </div>
      <div className="post-detail__comment-container">
        <h2>Comments</h2>
        <form
          className="post-detail__comment-form"
          action={formURL}
          method="post"
        >
          <div className="post-detail__comment-form-upper-part">
            <div className="post-detail__comment-password">
              <label htmlFor="comment-password">Password </label>
              <input
                id="comment-password"
                type="password"
                name="guestPassword"
              />
            </div>
            <button className="post-detail__comment-submit-button button--small">
              Submit
            </button>
          </div>
          <textarea
            className="post-detail__comment-content"
            name="content"
            cols="50"
            rows="5"
            placeholder="Be civil"
          ></textarea>
        </form>
        {postDetailData.comments.length === 0 ? (
          <div>-none-</div>
        ) : (
          postDetailData.comments
            .map((comment) => (
              <div className="post-detail__comment">
                <div>{dayjs(comment.createdAt).format('DD/MM/YYYY')}</div>
                <div>{comment.content}</div>
              </div>
            ))
            .reverse()
        )}
      </div>
    </div>
  );
};

export default PostDetail;
