import React, { useContext, useState } from "react";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { AppContext } from "../context/Context";
import { useRouter } from "next/router";

const baseURL = "http://localhost:5000";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { user, setUser } = useContext(AppContext);

  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("Success:", values);

    try {
      const { data } = await axios.post(
        `${baseURL}/auth/${isSignUp ? "signup" : "signin"}`,
        values
      );
      console.log(data);
      setUser(data);
      form.resetFields();
      router.push("/");
    } catch (error) {
      console.log(error?.response?.data?.message);
      message.error(error?.response?.data?.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const toggleAuth = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <>
      <div className="authContainer">
        <h2>{isSignUp ? "Create a new account" : "Sign in to your account"}</h2>
        <Form
          form={form}
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
                min: 5,
                message: "Invalid password!",
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
    </>
  );
};

export default Auth;
