import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./UpdatePostModal.module.css";
import postsApiClient from "../../../API/postsApiClient";

const { Option } = Select;

const UpdatePostModal = ({ visible, onClose, onSubmit, post }) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [hashTags, setHashTags] = useState([]);
  const [initialFileList, setInitialFileList] = useState([]);

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
        categoryId: post.categoryId,
        hashtagIds: post.hashtagIds,
        photo: null, // Оставить пустым, если пользователь не загрузил новое фото
      });

      // Если в посте уже есть фото, добавляем его как файл по умолчанию
      if (post.photoUrl) {
        setInitialFileList([
          {
            uid: "-1",
            name: "Existing Image",
            status: "done",
            url: post.photoUrl,
          },
        ]);
      }
    }
  }, [post, form]);

  const handleFinish = (values) => {
    const formData = {
      ...values,
      id: post?.id, // Добавляем ID для обновления поста
    };
    console.log("Updated Data:", formData);
    onSubmit(formData);
    form.resetFields();
    setInitialFileList([]);
  };

  return (
    <Modal
      title="Update Post"
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
          <Select placeholder="Select hashtags" mode="multiple">
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
        >
          <Upload
            listType="picture"
            beforeUpload={() => false}
            maxCount={1}
            defaultFileList={initialFileList}
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
