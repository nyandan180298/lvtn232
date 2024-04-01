import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "services/userService";

const Header = memo(() => {
  const [staffName, setStaffName] = useState("");
  const [pos, setPos] = useState("");
  const navigate = useNavigate();
  const handleClickHome = useCallback(() => {
    navigate("/khosanpham");
  }, [navigate]);

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

  const handleClickLogout = useCallback(() => {
    navigate("/logout");
  }, [navigate]);

  return (
    <div className="header">
      <div className="header-icon-container">
        <div className="header-logo" onClick={handleClickHome}>
          Icon
        </div>
        <div className="header-logo-text" onClick={handleClickHome}>
          Smart Iventory
        </div>
      </div>
      <div className="header-middle-container">
        <div className="staff-name"> Nhân viên: {staffName} </div>
        <div className="staff-position"> Chức vụ: {pos}</div>
      </div>
      <div className="header-button-container">
        <div className="header-support-button"> Hỗ Trợ </div>
        <div className="header-logout-button" onClick={handleClickLogout}>
          Đăng Xuất
        </div>
      </div>
    </div>
  );
});

export default Header;
