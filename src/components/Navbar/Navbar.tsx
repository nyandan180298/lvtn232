import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = memo(() => {
  const navigate = useNavigate();
  const handleClickHome = useCallback(() => {
    navigate("/khosanpham");
  }, [navigate]);
  return (
    <div className="navbar">
      <div className="navbar-tabs focus" onClick={handleClickHome}>
        Trang chủ
      </div>
      <div className="navbar-tabs">Thông báo</div>
      <div className="navbar-tabs">Đơn hàng bị hủy</div>
      <div className="navbar-tabs">Khách hàng</div>
    </div>
  );
});

export default Navbar;
