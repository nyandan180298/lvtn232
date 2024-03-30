import Header from "components/Header/Header";
import Navbar from "components/Navbar/Navbar";
import { memo } from "react";
import { Outlet } from "react-router-dom";

const Inner = memo(() => {
  return (
    <div className="main-layout">
      <Header />
      <Navbar />
      <div>
        {/* <Menu/> */}
        <Outlet />
      </div>
    </div>
  );
});

export default Inner;
