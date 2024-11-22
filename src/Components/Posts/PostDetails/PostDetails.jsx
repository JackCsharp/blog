import React, { useState } from "react";
import { Button, Flex, Input, Spin } from "antd";
import CommentsList from "../../Comments/CommentsList/CommentsList";
import Post from "../Post/Post";
import styles from "./PostDetails.module.css";
import postsApiClient from "../../../API/postsApiClient";

/**
 * Component to show selected post details and comments.
 * @param {Object} post - The selected post object.
 * @param {boolean} loading - Loading state for fetching comments.
 * @returns {JSX.Element}
 */
const PostDetails = ({ post, loading, fetchComments }) => {
  const [userComment, setUserComment] = useState({});

  const addComment = async () => {
    if(userComment.content){
      await postsApiClient.addComment(post.id,userComment);
      setUserComment({});
      fetchComments(post.id);
    }
  }

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin tip="Loading comments..." />
      </div>
    );
  }
  
  return (
    <div className={styles.detailsContainer}>
      {/* Displaying the selected post */}
      <Post post={post} />
      
      {/* Comments list */}
      <div className={styles.commentsSection}>
        <h4>Comments</h4>
        <Flex>
          <Input value={userComment.content} onChange={(e)=>setUserComment({...userComment, content: e.target.value})} placeholder="Write your comment"/>
          <Button onClick={()=>addComment()}>Add</Button>
        </Flex>
        <CommentsList comments={post.comments} />
      </div>
    </div>
  );
};

export default PostDetails;
