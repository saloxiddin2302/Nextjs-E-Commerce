"use client";
import { request } from "../../../server/request";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const register = async ({
    firstName,
    lastName,
    username,
    phoneNumber,
    password,
  }) => {
    const form = { firstName, lastName, username, phoneNumber, password };
    console.log(form);
    try {
      setLoading(true);
      const res = await request.post("auth/register", form);
      router.push("/login");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const formItemLayout = {
    labelCol: {
      md: { span: 6 },
    },
  };

  return (
    <div className="mb-6 rounded">
      <h2 className="py-5 text-4xl font-semibold text-center containr">
        Registratsiya
      </h2>
      <div className="p-10 bg-white rounded-md containr register bg-opacity-20 backdrop-blur-md lg:px-40 md:px-20">
        <Form
          name="register"
          onFinish={register}
          {...formItemLayout}
          className="text-center"
        >
          <Form.Item
            label="Firstname"
            name="firstName"
            rules={[
              { required: true, message: "Please input your firstname!" },
            ]}
            hasFeedback
          >
            <Input style={{ padding: "6px 10px" }} placeholder="Firstname" />
          </Form.Item>

          <Form.Item
            label="LastName"
            name="lastName"
            rules={[{ required: true, message: "Please input your lastName!" }]}
            hasFeedback
          >
            <Input style={{ padding: "6px 10px" }} placeholder="Lastname" />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            hasFeedback
          >
            <Input style={{ padding: "6px 10px" }} placeholder="username" />
          </Form.Item>

          <Form.Item
            label="PhoneNumber"
            name="phoneNumber"
            rules={[
              { required: true, message: "Please input your phoneNumber!" },
            ]}
            hasFeedback
          >
            <Input
              style={{ padding: "6px 10px" }}
              placeholder="+998 99 999-99-99"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            hasFeedback
          >
            <Input.Password
              style={{ padding: "6px 10px" }}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              style={{ padding: "6px 10px" }}
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Button
            loading={loading}
            htmlType="submit"
            className="w-1/3 h-10 mx-auto my-3 text-lg bg-white "
          >
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
