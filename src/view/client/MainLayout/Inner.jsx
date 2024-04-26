import Header from "components/Header/Header";
import LeftMenu from "components/LeftMenu";
import { memo, useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import userService from "services/userService";

const Inner = memo(() => {
  const [staffName, setStaffName] = useState("");
  const [pos, setPos] = useState("");

  const getUser = useCallback(async () => {
    const res = await userService.me();
    const name = res.data?.firstName + " " + res.data?.lastName;
    setStaffName(name);
    if (res.data?.isAdmin) {
      setPos("Quản Lý");
    } else if (!res.data?.isAdmin) {
      setPos("Nhân Viên");
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <div className="main-layout">
      <Header sname={staffName} spos={pos} />
      <div className="main-container">
        <div className="detail-left-container">
          <LeftMenu />
        </div>
        <div className="detail-right-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
});

export default Inner;
