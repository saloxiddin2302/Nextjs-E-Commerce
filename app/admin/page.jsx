"use client";

import { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
const { Sider } = Layout;
import {
  AlignCenterOutlined,
  TeamOutlined,
  FileTextOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getLocalStorage } from "../../const/const";
import { deleteCookie } from "cookies-next";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(
    <Link href="/dashboard">Dashboard</Link>,
    "/dashboard",
    <AlignCenterOutlined />
  ),
  getItem(<Link href="/users">Users</Link>, "/users", <TeamOutlined />),
  getItem(
    <Link href="/categories">Categories</Link>,
    "/categories",
    <ProfileOutlined />
  ),
  getItem(
    <Link href="/products">Products</Link>,
    "/products",
    <FileTextOutlined />
  ),
];

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname() || "/dashboard";

  const [collapsed, setCollapsed] = useState();

  const token = getLocalStorage();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  });

  const logOutAdmin = () => {
    const check = window.confirm("Do you want to log out of this account?");
    if (check) {
      deleteCookie("token");
      router.push("/login");
    }
  };

  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={[pathname]} items={items} />
          <button
            onClick={logOutAdmin}
            className="w-full py-1 my-2 text-white hover:bg-white hover:text-gray-700"
          >
            LogOut
          </button>
        </Sider>
        <div
          style={{ background: `url(/header.png)`, backgroundSize: "cover" }}
          className="w-full h-screen overflow-y-scroll"
        >
          <Layout style={{ background: "transparent" }}>{children}</Layout>
        </div>
      </Layout>
    </div>
  );
}
