import React, { useEffect, useState } from "react";
import { Spin, Alert } from "antd";
import PostsList from "../Components/Posts/PostList/PostList";
import Post from "../Components/Posts/Post/Post";
import postsApiClient from "../API/postsApiClient";

/**
 * Page component to fetch and display a list of posts.
 * @returns {JSX.Element}
 */
const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await postsApiClient.getAllPosts();
        console.log(response);
        setPosts(response.data); // Assuming the API returns an array of posts
      } catch (err) {
        setError("Failed to fetch posts. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Posts</h1>

      {loading && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
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

      {!loading && !error && <PostsList posts={posts} />}
    </div>
  );
};

export default PostsPage;
