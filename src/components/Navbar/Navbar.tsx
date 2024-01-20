import React, { memo } from 'react';

const Navbar = memo(() => {
    return (
        <div className="navbar">
            <div className="navbar-tabs focus">Trang chủ</div>
            <div className="navbar-tabs">Thông báo</div>
            <div className="navbar-tabs">Đơn hàng bị hủy</div>
            <div className="navbar-tabs">Khách hàng</div>
        </div>
    );
});

export default Navbar;
