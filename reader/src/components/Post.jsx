import dayjs from 'dayjs';
import DOMPurify from 'dompurify';

const Post = (props) => {
  const { postData, handlePostClick } = props;

  const formattedDate = dayjs(
    new Date(postData.updatedAt || postData.createdAt)
  ).format('DD/MM/YYYY');

  const sanitizedContentData = DOMPurify.sanitize(postData.content);
  const extractedContentData = sanitizedContentData.replace(/<[^>]+>/g, '');
  const shortenedContentData =
    extractedContentData.length > 15
      ? `${extractedContentData.slice(0, 15)}...`
      : extractedContentData;

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
      <div dangerouslySetInnerHTML={{ __html: shortenedContentData }} />
      <div>Comments ({postData.comments.length})</div>
    </div>
  );
};

export default Post;
