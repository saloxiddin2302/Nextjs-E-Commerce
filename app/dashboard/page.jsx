import { Image } from "antd";
import AdminLayout from "../admin/page";

const page = () => {
  return (
    <AdminLayout>
      <div className="w-full py-3 my-2 bg-white rounded-md bg-opacity-20 backdrop-blur-md">
        <h2 className="w-full text-xl text-center text-white">Dashboard</h2>
        <div className="w-full h-[400px] flex items-center justify-center text-center">
          <Image
            className="rounded-md"
            src="https://w7.pngwing.com/pngs/415/969/png-transparent-pie-chart-bar-chart-diagram-graph-of-a-function-accounting-presentation-toy-block-graph-of-a-function-thumbnail.png"
            alt=""
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default page;
