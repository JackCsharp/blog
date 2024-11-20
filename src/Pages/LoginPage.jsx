import React from "react";
import { Form, Input, Button, Typography } from "antd";
import styles from "./Styles/LoginPage.module.css";
import accountApiClient from "../API/accountApiClient";
import { useAuth } from "../common/AuthContext";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

const LoginPage = () => {
  const {setIsAuthorized} = useAuth();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const response = await accountApiClient.login(values);
    if(response){
      setIsAuthorized(true);
      navigate("/home");
    }
  };
  const onFinishFailed = (errorInfo) => {
  };

  return (
    <div className={styles.container}>
      <Title level={2} className={styles.title}>
        Вход в систему
      </Title>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className={styles.form}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Введите имя пользователя!" }]}
        >
          <Input placeholder="Имя пользователя" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Введите пароль!" }]}
        >
          <Input.Password placeholder="Пароль" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.button}>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
