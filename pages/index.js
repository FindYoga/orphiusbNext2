import { useState, useEffect } from "react";
import styles from "../styles/styles.module.css";

export default function Home() {
  const [data, setData] = useState({
    token:
      "egpK706FdEWAsTiJ5d9HU0:APA91bFGzUu3qGDubUjcVHjTy5DXTgoZIMH84zbso9YHBNRp6-1aWCim-TdjVZbNlskz9D9ofglugdUO6g2SbnDYNP6rxSPmhZLzf1YsW-dEjkuxRtXUum2aqKK_ssC4quKr5S4hM2kl",
    notification: {
      title: "",
      body: "",
    },
    data: {
      youtubeID: "fdKnwB-6nj4",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, key] = name.split(".");

    if (key) {
      setData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [key]: value,
        },
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var parentKey = "message";
    var message = {};
    message[parentKey] = data;

    console.log(message);

    try {
      const response = await fetch("/api/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        console.log("Message sent successfully!");
      } else {
        console.error("Server error:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Send Message</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Token:
            <input
              type="text"
              name="token"
              value={data.token}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </label>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Notification Title:
            <input
              type="text"
              name="notification.title"
              value={data.notification.title}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </label>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Notification Body:
            <input
              type="text"
              name="notification.body"
              value={data.notification.body}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </label>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            YouTube ID:
            <input
              type="text"
              name="data.youtubeID"
              value={data.data.youtubeID}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </label>
        </div>
        <button type="submit" className={styles.submitButton}>
          Send
        </button>
      </form>
    </div>
  );
}
