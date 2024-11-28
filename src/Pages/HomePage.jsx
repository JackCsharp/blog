import React from "react";
import { Button, Typography, Card } from "antd";
import styles from "./Styles/HomePage.module.css";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const HomePage = () => {
  const navigate = useNavigate();


  return (
    <div className={styles.homepage}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Title className={styles.title}>Welcome to Travel Tales</Title>
          <Paragraph className={styles.subtitle}>
            Discover inspiring travel stories, tips, and adventures from around the world.
          </Paragraph>
          <Button onClick={()=>navigate("/register")} type="primary" size="large" className={styles.ctaButton}>
            Register account
          </Button>
        </div>
      </header>

      <main className={styles.mainContent}>
        <Card className={styles.card}>
          <Title level={2}>About Our Blog</Title>
          <Paragraph>
            Travel Tales is a platform where passionate travelers share their stories, 
            stunning photographs, and travel advice. Whether you're planning your next trip 
            or just love exploring the world from your screen, we have something for you!
          </Paragraph>
        </Card>

        <Card className={styles.card}>
          <Title level={2}>What You Can Do Here</Title>
          <ul className={styles.featuresList}>
            <li>📍 Explore posts from travelers around the world.</li>
            <li>📝 Share your own travel experiences and tips.</li>
            <li>🔍 Find destinations by categories and hashtags.</li>
            <li>📷 Upload beautiful images of your adventures.</li>
          </ul>
        </Card>

        <Card className={styles.card}>
          <Title level={2}>Join our community of travelers and share your unique stories!</Title>
          <Paragraph>Already have account?</Paragraph>
          <Button onClick={()=>navigate("/login")} type="primary" size="large" className={styles.ctaButton}>
            Log in
          </Button>
        </Card>
      </main>

      <footer className={styles.footer}>
        <Paragraph>&copy; {new Date().getFullYear()} Travel Tales. All rights reserved.</Paragraph>
      </footer>
    </div>
  );
};

export default HomePage;
