import React, { useState } from "react";
import { Card, Typography, Modal } from "antd";
import styles from "./Post.module.css";

const { Title, Text } = Typography;

/**
 * Component to render a single post using Ant Design's Card component.
 * @param {Object} post - The post data.
 * @returns {JSX.Element}
 */
const Post = ({ post }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const TITLE_LIMIT = 50;
  const DESCRIPTION_LIMIT = 300;

  const truncateText = (text, limit) => {
    return text.length > limit ? `${text.substring(0, limit)}` : text;
  };

  const showModal = (e) => {
    e.stopPropagation();
    setIsModalVisible(true);
  };

  const closeModal = (e) => {
    e.stopPropagation();
    setIsModalVisible(false);
  };

  return (
    <>
      <Card hoverable bordered className={styles.card}>
        <Title level={4}>{truncateText(post.title, TITLE_LIMIT)}</Title>
        <Text>
          {truncateText(post.description, DESCRIPTION_LIMIT)}
          {post.description.length > DESCRIPTION_LIMIT && (
            <span className={styles.readMore} onClick={e=>showModal(e)}>
              {" "}
              ...read more
            </span>
          )}
        </Text>
        <Text className={styles.author} type="secondary">
          By: {post.author.firstName}
        </Text>
      </Card>

      {/* Modal for displaying full post description */}
      <Modal
        title={post.title}
        visible={isModalVisible}
        onCancel={e=>closeModal(e)}
        footer={null}
        className={styles.modal}
        bodyStyle={{
          maxHeight: "calc(100vh - 100px)", // Ensures height doesn't exceed screen
          overflowY: "auto", // Adds scroll for long content
        }}
        width="90%" // Almost full width of the screen
      >
        <Text>{post.description}</Text>
      </Modal>
    </>
  );
};

export default Post;
