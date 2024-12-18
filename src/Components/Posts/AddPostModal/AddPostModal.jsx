import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./AddPostModal.module.css";
import postsApiClient from "../../../API/postsApiClient";

const { Option } = Select;

const AddPostModal = ({ visible, onClose, onSubmit }) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [hashTags, setHashTags] = useState([]);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const categories = await postsApiClient.getCategories();
      const hashTags = await postsApiClient.getHashTags();
      setCategories(categories.data);
      setHashTags(hashTags.data);
    };

    fetchData();
  }, []);

  const handleFinish = (values) => {
    // Append file info to the form values
    const formData = {
      ...values
    };
    console.log("Submitted Data:", formData);
    onSubmit(formData);
    form.resetFields();
    setFileList([]);
  };

  return (
    <Modal
      title="Add New Post"
      visible={visible}
      onCancel={onClose}
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
          label="HashTag"
          name="hashtagIds"
          rules={[{ required: true, message: "Please select the hash tags" }]}
        >
          <Select placeholder="Select hashtag" mode="multiple">
            {hashTags?.map((hashTag) => (
              <Option key={hashTag.id} value={hashTag.id}>
                {hashTag.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
  label="Upload Image"
  name="photo"
  rules={[{ required: true, message: "Please upload an image" }]}
>
  <Upload
    listType="picture"
    beforeUpload={() => false}
    maxCount={1}
    onChange={(info) => {
      const file = info.fileList[0]?.originFileObj || null;
      form.setFieldsValue({ photo: file });
    }}
  >
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
</Form.Item>


        <div className={styles.footer}>
          <Button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" className={styles.submitButton}>
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddPostModal;

