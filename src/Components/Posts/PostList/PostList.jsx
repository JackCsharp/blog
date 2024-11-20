import React from "react";
import { List } from "antd";
import Post from "../Post/Post";

/**
 * Component to render a list of posts using Ant Design's List component.
 * @param {Array} posts - Array of post objects.
 * @returns {JSX.Element}
 */
const PostsList = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <p style={{ textAlign: "center", color: "#888" }}>No posts available.</p>;
  }

  return (
    <List
      dataSource={posts}
      renderItem={(post) => (
        <List.Item>
          <Post post={post} />
        </List.Item>
      )}
      style={{ padding: "20px", background: "#f9f9f9", borderRadius: "8px" }}
    />
  );
};

export default PostsList;
