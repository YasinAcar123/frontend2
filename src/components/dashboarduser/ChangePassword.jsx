import React, { useState, useEffect } from "react";
import { Alert, Form, Input, Typography, Button } from "antd";
import axios from "axios";

const ChangePassword = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState(null);

  console.log(userData);

  useEffect(() => {
    const getCookie = (name) => {
      let value = `; ${document.cookie}`;
      let parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    };

    const decodeToken = () => {
      let token = getCookie("user");
      if (token && token.startsWith("j%3A")) {
        // Decode the URL-encoded token and remove the 'j:' prefix
        token = decodeURIComponent(token).slice(2);
        try {
          const decoded = JSON.parse(token);
          return decoded;
        } catch (error) {
          console.error("Invalid token specified:", error);
          return null;
        }
      }
      return null;
    };

    setUserData(decodeToken());
  }, []);

  const handleChangePassword = (values) => {
    if (values.newPassword !== values.confirmPassword) {
      setError("Passwords do not match");
      setSuccess(false);
    } else {
      setError(null);
      setSuccess(true);
      // Logic to handle password change
      if (userData && userData.user_id) {
        axios
          .put(
            `https://backend-yax1.onrender.com/users/change-password/${userData.user_id}`,
            {
              password: values.password,
              newPassword: values.newPassword,
              confirmPassword: values.confirmPassword,
            },
            {
              withCredentials: true, // Include credentials (cookies)
            }
          )
          .then((response) => {
            console.log("Password changed successfully", response);
          })
          .catch((error) => {
            setError("Failed to change password");
            setSuccess(false);
            console.error("Error changing password", error);
          });
      } else {
        setError("User ID not found");
        setSuccess(false);
      }
    }
  };

  return (
    <div>
      <Typography.Title level={3}>Change Password</Typography.Title>
      <Form name="changePassword" onFinish={handleChangePassword}>
        <Form.Item
          label="Current Password"
          name="password"
          rules={[
            { required: true, message: "Please input your current password!" },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            { required: true, message: "Please input your new password!" },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            { required: true, message: "Please confirm your new password!" },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Change Password
          </Button>
        </Form.Item>
      </Form>
      {error && <Alert message={error} type="error" />}
      {success && (
        <Alert message="Password changed successfully" type="success" />
      )}
    </div>
  );
};

export default ChangePassword;
