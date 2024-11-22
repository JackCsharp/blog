import React, { useState } from "react";
import styles from "./Comment.module.css";

/**
 * Component to render a single comment.
 * @param {Object} props
 * @param {string} props.author - The author of the comment.
 * @param {string} props.content - The content of the comment.
 * @returns {JSX.Element}
 */
const Comment = ({ author, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const CHAR_LIMIT = 100; // Limit for content preview

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const renderContent = () => {
    if (isExpanded || content.length <= CHAR_LIMIT) {
      return content;
    }
    return `${content.substring(0, CHAR_LIMIT)}...`;
  };

  return (
    <div className={styles.comment}>
      <p className={styles.author}>{author.firstName}</p>
      <p className={styles.content}>
        {renderContent()}
        {content.length > CHAR_LIMIT && (
          <span
            className={styles.readMore}
            onClick={toggleExpand}
            role="button"
          >
            {isExpanded ? " Show less" : " Read more"}
          </span>
        )}
      </p>
    </div>
  );
};

export default Comment;
