import React, { useState } from "react";
import styles from "./Comment.module.css";
import { Badge, Button, Card, Input, Tag } from "antd";
import postsApiClient from "../../../API/postsApiClient";

/**
 * Component to render a single comment.
 * @param {Object} props
 * @param {string} props.author - The author of the comment.
 * @param {string} props.content - The content of the comment.
 * @returns {JSX.Element}
 */
const Comment = ({ id, post, author, content, replies }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRepliable, setIsRepliable] = useState(false);
  const [commentReply, setCommentReply] = useState({});

  const CHAR_LIMIT = 100;

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  const addReply = () => {
    console.log(id);  
    setCommentReply({...commentReply, parentCommentId: id})
    postsApiClient.addComment(post.id,commentReply);
    console.log(commentReply);  
    setIsRepliable(false);
  }
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
      {<Button onClick={()=>setIsRepliable(!isRepliable)}>{!isRepliable?"Replies":"Hide"}</Button>}
      {isRepliable&&
      <div>
        {replies?.map((reply)=>(
          <Tag className={styles.reply}> {reply.author.firstName +":  "+ reply.content} </Tag>
        ))}
        <p><Input placeholder="reply" value={commentReply.content} onChange={e=>setCommentReply({...commentReply, content: e.target.value})}/></p>
        <p><Button onClick={()=>addReply()}>Post</Button></p>
      </div>
     
      }
      
      
    </div>
  );
};

export default Comment;
