import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select, message } from "antd";
import styles from "./UpdatePostModal.module.css";
import postsApiClient from "../../../API/postsApiClient";

const { Option } = Select;

const UpdatePostModal = ({ visible, onClose, onSubmit, post }) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [hashTags, setHashTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const categories = await postsApiClient.getCategories();
      const hashTags = await postsApiClient.getHashTags();
      setCategories(categories.data);
      setHashTags(hashTags.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (post) {
      form.setFieldsValue({
        title: post.title,
        description: post.description,
        categoryId: post.category.id,
        hashtags: post.hashtags.map((tag) => tag.id),
      });
    }
  }, [post, form]);

  const handleFinish = async (values) => {
    const formData = {
      id: post?.id,
      title: values.title,
      description: values.description,
      categoryId: values.categoryId,
      hashtags: values.hashtags.map((id) =>
        hashTags.find((tag) => tag.id === id)
      ),
    };

    try {
      const response = await postsApiClient.updatePost(formData);
      message.success("Post updated successfully!");
      onSubmit(response.data);
      form.resetFields();
    } catch (error) {
      console.error("Error updating post:", error);
      message.error("Failed to update post. Please try again.");
    }
  };

  return (
    <Modal
      title="Update Post"
      visible={visible}
      onCancel={e=>onClose(e)}
      footer={null}
      className={styles.modal}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className={styles.form}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter the post title" }]}
        >
          <Input placeholder="Enter post title" />
        </Form.Item>
        <Form.Item
          label="Content"
          name="description"
          rules={[{ required: true, message: "Please enter the post content" }]}
        >
          <Input.TextArea rows={4} placeholder="Enter post content" />
        </Form.Item>
        <Form.Item
          label="Category"
          name="categoryId"
          rules={[{ required: true, message: "Please select the post category" }]}
        >
          <Select placeholder="Select category">
            {categories?.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Hashtags"
          name="hashtags"
          rules={[{ required: true, message: "Please select the hashtags" }]}
        >
          <Select placeholder="Select hashtags" mode="multiple">
            {hashTags?.map((hashTag) => (
              <Option key={hashTag.id} value={hashTag.id}>
                {hashTag.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <div className={styles.footer}>
          <Button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.submitButton}
          >
            Update
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default UpdatePostModal;
