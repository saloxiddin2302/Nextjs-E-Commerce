"use client";

import { useEffect, useState } from "react";

import { Button, Modal, Form, Input, message, Spin } from "antd";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { request } from "../../server/request";
import Image from "next/image";
import AdminLayout from "../adminLayout";

export default function UsersP() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [form] = Form.useForm();

  const getCategories = async () => {
    try {
      setLoading(true);
      let res = await request.get("category");
      let data = res.data;
      setCategories(data);
    } catch (err) {
      message.error(err.response ? err.response.data.msg : "Timeout");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const openUserModal = () => {
    showModal();
    setSelected(null);
    form.resetFields();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const res = { ...values, image: { url: imgUrl } };

      if (selected) {
        request
          .put(`category/${selected}`, res)
          .then(() => {
            setIsModalOpen(false);
            getCategories();
            message.success("Successfully changed");
          })
          .catch((err) => {
            message.error(err.response ? err.response.data.msg : "Timeout");
          });
      } else {
        request
          .post("category", res)
          .then(() => {
            setIsModalOpen(false);
            getCategories();
            message.success("Successfully added");
          })
          .catch((err) => {
            message.error(err.response ? err.response.data.msg : "Timeout");
          });
      }
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  async function editCategory(id) {
    setSelected(id);
    try {
      const { data } = await request.get(`category/${id}`);
      form.setFieldsValue({ name: data.name });
      setImgUrl(data?.image?.url);
      showModal();
    } catch (err) {
      message.error(err.response ? err.response.data.msg : "Timeout");
    }
  }

  const deleteCategory = async (id) => {
    const checkDelete = confirm("Do you want to launch this category?");
    if (checkDelete) {
      try {
        await request.delete(`category/${id}`);
        await getCategories();
      } catch (err) {
        message.error(err.response ? err.response.data.msg : "Timeout");
      }
    }
  };

  const addImg = (e) => {
    let img = e.target.files[0];
    const form = new FormData();
    img && form.append("file", img);
    request.post("upload", form).then((res) => {
      setImgUrl(res?.data.url);
    });
  };
  return (
    <AdminLayout>
      <main className="pt-2 containr">
        {categories.length !== 0 ? (
          <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 text-white bg-black rounded-md title bg-opacity-20 backdrop-blur-md">
            <h2 className="text-xl">All Categories</h2>
            <Button onClick={openUserModal}>Add</Button>
          </div>
        ) : null}
        {!loading ? (
          <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-2">
            {categories?.map((ctg) => (
              <div
                key={ctg?._id}
                className="bg-white rounded backdrop-blur-md bg-opacity-20"
              >
                <Image
                  src={ctg?.image?.url}
                  alt="product img"
                  height={200}
                  width={300}
                  style={{
                    objectFit: "cover",
                    height: "160px",
                    width: "100%",
                    borderRadius: "5px",
                  }}
                />
                <p className="py-2 text-base text-center text-white">
                  {ctg?.name}
                </p>
                <div className="flex justify-center gap-2 mb-2">
                  <Button
                    onClick={() => deleteCategory(ctg._id)}
                    danger
                    type="primary"
                  >
                    <DeleteOutlined />
                  </Button>
                  <Button
                    style={{ background: "green" }}
                    onClick={() => editCategory(ctg._id)}
                    type="primary"
                  >
                    <EditOutlined />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-screen">
            <Spin size="large" />
          </div>
        )}
        <Modal
          title={selected ? "Editing category" : "Adding category"}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText={selected ? "Save" : "Add"}
          className="md"
        >
          <div className="flex flex-col items-center justify-center w-full gap-2">
            {imgUrl ? (
              <Image
                src={`${imgUrl}`}
                alt="product img"
                height={200}
                width={300}
                style={{
                  objectFit: "cover",
                  height: "200px",
                  width: "70%",
                  border: "1px solid",
                  margin: "0 auto",
                  borderRadius: "5px",
                }}
              />
            ) : null}
            <input type="file" onChange={addImg} placeholder="Change img" />
          </div>
          <Form
            name="category"
            form={form}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ maxWidth: 500 }}
            autoComplete="off"
          >
            <Form.Item
              label="Category name"
              name="name"
              rules={[{ required: true, message: "Please fill this field!" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </main>
    </AdminLayout>
  );
}
