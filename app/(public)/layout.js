import FrontFooter from "../../components/footers/FrontFooter";
import dynamic from "next/dynamic";
// import FrontNav from "@/FrontNav/navs/FrontNav";

const FrontNav = dynamic(() => import("../../components/navs/FrontNav"), {
  ssr: false,
});

import { Fragment } from "react";

const layout = ({ children }) => {
  return (
    <Fragment>
      <nav className="fixed top-0 left-0 z-10 w-full bg-black bg-opacity-30 backdrop-blur-md">
        <FrontNav />
      </nav>
      <div
        style={{ background: `url(/header.png)`, backgroundSize: "cover" }}
        className="fixed top-0 left-0 w-screen h-screen pt-20 overflow-y-scroll text-white "
      >
        <main>{children}</main>
        <footer className="bg-white rounded-md containr bg-opacity-20 backdrop-blur-md p-7">
          <FrontFooter />
        </footer>
      </div>
    </Fragment>
  );
};

export default layout;
