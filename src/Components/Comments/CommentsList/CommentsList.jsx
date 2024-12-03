import React, { useEffect } from "react";
import Comment from "../Comment/Comment";
import styles from "./CommentsList.module.css";

/**
 * Component to render a list of comments.
 * @param {Object} props
 * @param {Array} props.comments - List of comments to display.
 * @returns {JSX.Element}
 */
const CommentsList = ({ comments, post }) => {
  useEffect(()=>{
    console.log(comments);
  },[])
  return (
    <div className={styles.commentsList}>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          id={comment.id}
          post={post}
          author={comment.author}
          content={comment.content}
          replies={comment.replies}
        />
      ))}
    </div>
  );
};

export default CommentsList;
