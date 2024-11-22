import React, { useState } from "react";
import { List } from "antd";
import Post from "../Post/Post";
import postsApiClient from "../../../API/postsApiClient";
import PostDetails from "../PostDetails/PostDetails";  // Новый компонент для деталей поста и комментариев
import styles from "./PostsList.module.css";  // Импортируем стили

/**
 * Component to render a list of posts using Ant Design's List component.
 * @param {Array} posts - Array of post objects.
 * @returns {JSX.Element}
 */
const PostsList = ({ posts, className }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentsLoading, setCommentsLoading] = useState(false);

  // Fetch comments when a post is selected
  const fetchComments = async (postId) => {
    setCommentsLoading(true);
    try {
      const response = await postsApiClient.getComments(postId);
      setSelectedPost((prevPost) => ({
        ...prevPost,
        comments: response.data,
      }));
    } catch (err) {
      console.error("Failed to fetch comments", err);
    } finally {
      setCommentsLoading(false);
    }
  };

  const handlePostClick = (post) => {
      if(selectedPost?.id===post.id){
        setSelectedPost(null);
        }
    else{
      setSelectedPost(post);
      fetchComments(post.id);
    }
  };


  if (!posts || posts.length === 0) {
    return <p style={{ textAlign: "center", color: "#888" }}>No posts available.</p>;
  }

  return (
    <div className={className}>
      <div className={styles.container}>
      {/* Posts list */}
      <List
        dataSource={posts}
        renderItem={(post) => (
          <List.Item onClick={() => handlePostClick(post)} className={styles.postItem}>
            <Post post={post} />
          </List.Item>
        )}
        className={styles.list}
      />

      {/* Post details and comments */}
      {selectedPost && (
        <PostDetails post={selectedPost} loading={commentsLoading} fetchComments={fetchComments}/>
      )}
    </div>
    </div>
    
  );
};

export default PostsList;
