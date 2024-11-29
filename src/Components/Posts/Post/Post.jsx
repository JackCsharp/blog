import React, { useEffect, useState } from "react";
import { Card, Typography, Modal, Tag, Image, Button } from "antd";
import styles from "./Post.module.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import postsApiClient from "../../../API/postsApiClient";
import UpdatePostModal from "../UpdatePostModal/UpdatePostModal.jsx"; // Предполагается, что UpdatePostModal уже создан

const { Title, Text } = Typography;

const Post = ({ post, fetchPosts }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [userId, setUserId] = useState();

  const TITLE_LIMIT = 50;
  const DESCRIPTION_LIMIT = 300;

  const truncateText = (text, limit) => {
    return text.length > limit ? `${text.substring(0, limit)}` : text;
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      try {
        const base64Payload = token.split(".")[1];
        const payload = JSON.parse(atob(base64Payload));
        setUserId(payload.userId);
      } catch (error) {
        console.error("Error decoding token:", error.message);
      }
    }
  }, []);

  const deletePost = (id) => {
    postsApiClient.deletePost(id).then(() => {
      console.log(`Post ${id} deleted successfully`);
      fetchPosts();
    });
    
  };

  const handleUpdatePost = async (updatedPost) => {
    try {
      if(updatedPost.photo===null){
        delete updatedPost.photo;
      }
      await postsApiClient.updatePost(post.id, updatedPost);
      console.log(`Post ${post.id} updated successfully`);
      setIsUpdateModalVisible(false);
      fetchPosts();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const showReadMoreModal = (e) => {
    e.stopPropagation();
    setIsModalVisible(true);
  };

  const closeReadMoreModal = (e) => {
    e.stopPropagation();
    setIsModalVisible(false);
  };

  const openUpdateModal = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsUpdateModalVisible(true);
  };

  const closeUpdateModal = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsUpdateModalVisible(false);
  };

  return (
    <>
      <Card hoverable bordered className={styles.card}>
        <Title level={4}>{truncateText(post.title, TITLE_LIMIT)}</Title>
        {post.photoUrl ? (
          <Image maxWidth={200} height={100} src={post.photoUrl} />
        ) : (
          <div></div>
        )}
        <span className={styles.category}>
          Category: {post.category.name};
        </span>{" "}
        <Text>
          Content:{" "}
          {truncateText(post.description, DESCRIPTION_LIMIT)}
          {post.description.length > DESCRIPTION_LIMIT && (
            <span className={styles.readMore} onClick={showReadMoreModal}>
              {" "}
              ...read more
            </span>
          )}
        </Text>{" "}
        {post.hashtags.map((tag) => (
          <Tag color="blue" key={tag.id}>
            {tag.name}{" "}
          </Tag>
        ))}
        <Text className={styles.author} type="secondary">
          By: {post.author.firstName}{" "}
          {String(post.author.id) === userId && (
            <>
              <EditOutlined
                className={styles.editIcon}
                onClick={openUpdateModal}
              />{" "}
              <DeleteOutlined
                className={styles.deleteIcon}
                onClick={() => deletePost(post.id)}
              />
            </>
          )}
        </Text>
      </Card>

      {/* Modal for displaying full post description */}
      <Modal
        title={post.title}
        visible={isModalVisible}
        onCancel={closeReadMoreModal}
        footer={null}
        className={styles.modal}
        bodyStyle={{
          maxHeight: "calc(100vh - 100px)",
          overflowY: "auto",
        }}
        width="90%"
      >
        <p>{post.description}</p>
      </Modal>

      {/* Modal for updating the post */}
      {isUpdateModalVisible && (
        <UpdatePostModal
          visible={isUpdateModalVisible}
          onClose={closeUpdateModal}
          onSubmit={handleUpdatePost}
          post={post}
        />
      )}
    </>
  );
};

export default Post;
