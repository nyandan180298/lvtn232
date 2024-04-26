import { FC, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface IHeaderProps {
  sname: string;
  spos: string;
}

const Header: FC<IHeaderProps> = memo(({ sname, spos }) => {
  const navigate = useNavigate();
  const handleClickHome = useCallback(() => {
    navigate("/kho");
    navigate(0)
  }, [navigate]);

  const handleClickLogout = useCallback(() => {
    navigate("/logout");
    navigate(0)
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
        {sname && <div className="staff-name"> Tên tài khoản: {sname} </div>}
        {spos && <div className="staff-position"> Chức vụ: {spos} </div>}
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
