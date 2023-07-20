import dayjs from 'dayjs';
import DOMPurify from 'dompurify';

const Post = (props) => {
  const { postData, handlePostClick } = props;

  const sanitizedContentData = DOMPurify.sanitize(postData.content);
  const extractedContentData = sanitizedContentData.replace(/<[^>]+>/g, '');
  const shortenedContentData =
    extractedContentData.length > 15
      ? `${extractedContentData.slice(0, 15)}...`
      : extractedContentData;

  return (
    <div
      className="post-container__post"
      onClick={() => {
        handlePostClick(postData);
      }}
    >
      <div>
        <h2>
          {postData.title} ({postData.comments.length})
        </h2>
        <div>{postData.author.name}</div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: shortenedContentData }} />
    </div>
  );
};

export default Post;
