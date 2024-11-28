import React, { useEffect, useState } from "react";
import { Card, Typography, Modal, Tag, Image } from "antd";
import styles from "./Post.module.css";
import { DeleteOutlined } from "@ant-design/icons";
import postsApiClient from "../../../API/postsApiClient";

const { Title, Text } = Typography;

/**
 * Component to render a single post using Ant Design's Card component.
 * @param {Object} post - The post data.
 * @returns {JSX.Element}
 */
const Post = ({ post }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userId, setUserId] = useState();


  
  const TITLE_LIMIT = 50;
  const DESCRIPTION_LIMIT = 300;

  const truncateText = (text, limit) => {
    return text.length > limit ? `${text.substring(0, limit)}` : text;
  };

  useEffect(()=>{
    const token = localStorage.getItem('jwtToken');

    if (token) {
      try {
        const base64Payload = token.split('.')[1];
        const payload = JSON.parse(atob(base64Payload));
        setUserId(payload.userId);
      } catch (error) {
        console.error('Error decoding token:', error.message);
      }} 
  },[])

  const deletePost = (id) => {
    postsApiClient.deletePost(id);
  }


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
        {post.photoUrl ? (
            <Image maxWidth={200} height={100} src={post.photoUrl}/>
          ) : (
            <div></div>
          )}
        <span className={styles.category}>Category: {post.category.name};</span>
        {" "}
        
        <Text>
          Content: {" "}
          {truncateText(post.description, DESCRIPTION_LIMIT)}
          {post.description.length > DESCRIPTION_LIMIT && (
            <span className={styles.readMore} onClick={e=>showModal(e)}>
              {" "}
              ...read more 
            </span>
          )}
        </Text>
        {" "}
        {post.hashtags.map((tag) => (
              <Tag color="blue" key={tag.id}>{tag.name} </Tag>
        ))}
        <Text className={styles.author} type="secondary">
          By: {post.author.firstName} {"    "}
          {String(post.author.id)===userId&& <DeleteOutlined onClick={()=>deletePost(post.id)}/> }
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
      </Modal>
    </>
  );
};

export default Post;
