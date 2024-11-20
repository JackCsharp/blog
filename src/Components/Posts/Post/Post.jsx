import React from "react";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

/**
 * Component to render a single post using Ant Design's Card component.
 * @param {Object} post - The post data.
 * @returns {JSX.Element}
 */
const Post = ({ post }) => {
  return (
    <Card
      hoverable
      style={{ width: "100%" }}
      bodyStyle={{ padding: "16px" }}
      bordered
    >
      <Title level={4} style={{ marginBottom: "8px" }}>
        {post.title}
      </Title>
      <Text style={{ display: "block", marginBottom: "12px" }}>{post.content}</Text>
      <Text type="secondary" style={{ float: "right" }}>
        By: {post.author}
      </Text>
    </Card>
  );
};

export default Post;
