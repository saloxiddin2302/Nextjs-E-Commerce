import { Spin } from "antd";

const loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Spin size="large" />
    </div>
  );
}

export default loading