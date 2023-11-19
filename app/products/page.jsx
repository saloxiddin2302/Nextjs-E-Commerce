"use client";
import { request } from "../../server/request";
import { Button, Form, Input, Modal, Pagination, Spin, message } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import Image from "next/image";

import TextArea from "antd/es/input/TextArea";
import AdminLayout from "../admin/adminLayout";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const mainShowModal = () => {
    form.resetFields();
    setIsModalVisible(true);
    setSelected(null);
  };

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await request.get(`product?page=${page}`);
      setTotal(response.data.total);
      let data = response.data.products;
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      const { title, price, description, quantity, category } = values;

      const requestData = {
        title: title,
        price: price,
        description: description,
        quantity: quantity,
        category: category,
        image: {
          url: imgUrl,
        },
      };

      if (selected) {
        request
          .put(`product/${selected}`, requestData)
          .then(() => {
            setIsModalVisible(false);
            getData();
            message.success("Successfully changed");
          })
          .catch((err) => {
            message.error(err.response ? err.response.data.msg : "Timeout");
          });
      } else {
        request
          .post("product", requestData)
          .then(() => {
            setIsModalVisible(false);
            getData();
            setLoading(false);
          })
          .catch((err) => {
            message.error(
              err.response ? err.response.data.msg : "Timeout error "
            );
          });
      }
    });
  };

  const deleteProduct = async (id) => {
    const check = confirm("Do you want to launch this product?");
    if (check) {
      try {
        setLoading(true);
        await request.delete(`product/${id}`);
        getData();
        setLoading(false);
        message.success("Successfully deleted");
      } catch (err) {
        message.error(err.response ? err.response.data.msg : "Timeout");
      }
    }
  };

  async function editProduct(id) {
    setSelected(id);
    try {
      const { data } = await request.get(`product/${id}`);
      setImgUrl(data?.image?.url);
      form.setFieldsValue(data);
      showModal();
    } catch (err) {
      message.error(err.response ? err.response.data.msg : "Timeout error");
    }
  }

  const changePage = (e) => {
    setPage(e);
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
      <div className="containr">
        <div className="flex justify-between items-center mb-[20px] shadow-xl bg-white bg-opacity-10 backdrop-blur-md text-white p-2 rounded-lg mt-2">
          <h1 className="text-xl">All Products</h1>
          <Button
            type="primary"
            size="large"
            className="bg-blue-500"
            onClick={mainShowModal}
          >
            Add Product
          </Button>
        </div>
        {loading ? (
          <div className="w-full flex justify-center items-center h-[400px] bg-white bg-opacity-20 backdrop-blur-md rounded-md">
            <Spin size="large" />
          </div>
        ) : (
          <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-2">
            {products?.length !== 0 ? (
              products?.map((pr) => (
                <div
                  key={pr?._id}
                  className="bg-white rounded backdrop-blur-md bg-opacity-20"
                >
                  <Image
                    src={pr?.image?.url}
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
                  <div className="p-2">
                    <p className="text-base text-center text-white">
                      {pr?.title}
                    </p>
                    <p className="text-sm text-white">Price: {pr?.price}</p>
                    <p className="text-sm text-white">Total: {pr?.quantity}</p>
                  </div>
                  <div className="flex justify-center gap-2 mb-2">
                    <Button
                      onClick={() => deleteProduct(pr._id)}
                      danger
                      type="primary"
                    >
                      <DeleteOutlined />
                    </Button>
                    <Button
                      style={{ background: "green" }}
                      onClick={() => editProduct(pr._id)}
                      type="primary"
                    >
                      <EditOutlined />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center w-full h-screen">
                <Spin size="large" />
              </div>
            )}
          </div>
        )}
        {products.length !== 0 && !loading ? (
          <div className="flex justify-center py-2 bg-white rounded-md bg-opacity-20 backdrop-blur-md">
            <Pagination
              defaultCurrent={page}
              total={total}
              onChange={changePage}
            />
          </div>
        ) : null}

        <Modal
          title="Create New Category"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={handleOk}
              form="editCategoryForm"
              htmlType="submit"
            >
              {selected ? "Save Changes" : "Add Product"}
            </Button>,
          ]}
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
                  height: "150px",
                  width: "250px",
                  border: "1px solid",
                  margin: "0 auto",
                  borderRadius: "5px",
                }}
              />
            ) : null}
            <input type="file" onChange={addImg} placeholder="Change img" />
          </div>
          <Form
            name="editCategoryForm"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            form={form}
          >
            <Form.Item
              name="category"
              label="Product Category"
              rules={[
                { required: true, message: "Please enter product title" },
              ]}
            >
              <Input placeholder="Product Category" />
            </Form.Item>
            <Form.Item
              name="title"
              label="Product title"
              rules={[
                { required: true, message: "Please enter product title" },
              ]}
            >
              <Input placeholder="Product name" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Product description"
              rules={[
                { required: true, message: "Please enter product description" },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item
              name="price"
              label="Product price"
              rules={[
                { required: true, message: "Please enter product price" },
              ]}
            >
              <Input type="number" placeholder="Product Price" />
            </Form.Item>
            <Form.Item
              name="quantity"
              label="Product quantity"
              rules={[
                { required: true, message: "Please enter product price" },
              ]}
            >
              <Input type="number" placeholder="Product quantity" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default Products;
