"use client";

import { TOKEN } from "../../../const/const";
import { setAuth } from "../../../redux/slice/authSlice";
import { request } from "../../../server/request";
import { Button, Form, Input } from "antd";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const login = async (form) => {
    try {
      setLoading(true);
      const {
        data: { accesstoken, user },
      } = await request.post("auth/login", form);
      if (user?.role === 1) {
        router.push("/dashboard");
        setCookie(TOKEN, accesstoken);
        dispatch(setAuth());
        request.defaults.headers.Authorization = `Bearer ${accesstoken}`;
      } else {
        router.push("/");
        setCookie(TOKEN, accesstoken);
        dispatch(setAuth());
        request.defaults.headers.Authorization = `Bearer ${accesstoken}`;
      }
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
        LogIn
      </h2>
      <div className="p-10 bg-white rounded-md containr register bg-opacity-20 backdrop-blur-md lg:px-40 md:px-20">
        <Form
          name="login"
          onFinish={login}
          {...formItemLayout}
          className="text-center"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            hasFeedback
          >
            <Input style={{ padding: "6px 10px" }} placeholder="username" />
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

          <Button
            loading={loading}
            htmlType="submit"
            className="w-1/3 h-10 mx-auto my-3 text-lg bg-white "
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
