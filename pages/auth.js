import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const toggleAuth = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <div className="authContainer">
      <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
        layout="vertical"
      >
        {isSignUp && (
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                min: 3,
                message: "Invalid name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}
        {isSignUp && (
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                min: 3,
                message: "Invalid name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Invalid email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {isSignUp && (
          <Form.Item
            label="Phone number"
            name="phoneNumber"
            rules={[
              {
                required: true,
                min: 8,
                message: "Invalid phone number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" block htmlType="submit">
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </Form.Item>
      </Form>
      <a onClick={toggleAuth}>
        {isSignUp
          ? "Already have an account? Sign In"
          : "Do not have an account yet? Sign Up"}
      </a>
    </div>
  );
};

export default Auth;
