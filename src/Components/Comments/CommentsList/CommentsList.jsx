import React from "react";
import Comment from "../Comment/Comment";
import styles from "./CommentsList.module.css";

/**
 * Component to render a list of comments.
 * @param {Object} props
 * @param {Array} props.comments - List of comments to display.
 * @returns {JSX.Element}
 */
const CommentsList = ({ comments }) => {
  return (
    <div className={styles.commentsList}>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          author={comment.author}
          content={comment.content}
        />
      ))}
    </div>
  );
};

export default CommentsList;
