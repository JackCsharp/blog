import React, { useEffect, useState } from "react";
import { Spin, Alert, Button, Input } from "antd";
import PostsList from "../Components/Posts/PostsList/PostsList";
import postsApiClient from "../API/postsApiClient";
import styles from "./Styles/PostsPage.module.css";
import AddPostModal from "../Components/Posts/AddPostModal/AddPostModal";

/**
 * Page component to fetch and display a list of posts.
 * @returns {JSX.Element}
 */
const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]); // For filtered posts based on hashtags
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // To store search input

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await postsApiClient.getAllPosts();
      setPosts(response.data); // Assuming the API returns an array of posts
      setFilteredPosts(response.data); // Initialize filteredPosts with all posts
    } catch (err) {
      setError("Failed to fetch posts. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    // Filter posts based on the search term and hashtags
    const filtered = posts.filter(post =>
      post.hashtags.some(hashtag =>
        hashtag.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredPosts(filtered);
  }, [searchTerm, posts]);

  const handleAddPost = async (newPost) => {
    try {
      await postsApiClient.createPost(newPost);
      fetchPosts();
      setModalVisible(false);
    } catch (err) {
      console.error("Failed to add post", err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>


      <div>
        <Input
          placeholder="Search by hashtag..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      <h1 className={styles.headerText}>Posts</h1>

      <Button onClick={() => setModalVisible(true)} className={styles.addPostButton}>Add Post</Button>

      </div>

      

      {loading && (
        <div className={styles.loader}>
          <Spin tip="Loading posts..." />
        </div>
      )}

      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          style={{ marginBottom: "20px" }}
        />
      )}

      {!loading && !error && (
        <PostsList posts={filteredPosts} />
      )}

      <AddPostModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddPost}
      />
    </div>
  );
};

export default PostsPage;
