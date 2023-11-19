"use client";
import { request } from "../../../server/request";
import { Empty, Spin } from "antd";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";

const OrderHistoryPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const getProducts = async () => {
    try {
      setLoading(true);
      const { data } = await request("auth/payments");
      setProducts(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Fragment>
      <h2 className="py-2 text-xl text-center sm:text-3xl">
        Buyurtmalar Tarixi
      </h2>
      <div className="py-5 mb-4 bg-white rounded-md bg-opacity-20 backdrop-blur-md containr">
        {loading ? (
          <div className="flex justify-center">
            <Spin size="large" />
          </div>
        ) : products?.length > 0 ? (
          products?.map((pr) => (
            <div key={pr._id} className="pt-3">
              <div className="flex items-center justify-between px-4">
                <p className="text-lg">Kuni : {pr?.createdAt.split("T")[0]}</p>
                <p
                  className={`text-lg px-2 rounded ${
                    pr?.status === "SUCCESS"
                      ? "bg-green-400"
                      : pr?.status === "ACCEPTED"
                      ? "bg-orange-400"
                      : "bg-red-500"
                  } `}
                >
                  {pr?.status}
                </p>
              </div>
              <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 containr gap-3 p-2">
                {pr?.cart?.map((el) => (
                  <div
                    key={el._id}
                    className="bg-white cart bg-opacity-20 backdrop-blur-md text-white rounded p-0.5 border-black"
                  >
                    <Image
                      src={el?.product?.image?.url}
                      alt="product img"
                      height={200}
                      width={300}
                      style={{
                        objectFit: "cover",
                        height: "250px",
                        width: "100%",
                        borderRadius: "3px 3px 0px 0px",
                      }}
                    />
                    <div className="px-4 py-2">
                      <h3 className="w-full text-xl font-semibold text-center">
                        {el?.product?.title}
                      </h3>
                      <p className="py-1 m-0">Miqdor: {el?.quantity}</p>
                      <p className="py-1 m-0">Narx: {el?.product?.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="py-3 bg-white rounded-md bg-opacity-20 backdrop-blur-md containr">
            <Empty />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default OrderHistoryPage;
