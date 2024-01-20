import { memo } from 'react';

const Header = memo(() => {
    return (
        <div className="header">
            <div className="header-icon-container">
                <div className="header-logo"> Icon </div>
                <div className="header-logo-text"> Smart Iventory </div>
            </div>
            <div className="header-middle-container">
                <div className="staff-name"> Nhân viên: </div>
                <div className="staff-position"> Chức vụ: </div>
            </div>
            <div className="header-button-container">
                <div className="header-support-button"> Hỗ Trợ </div>
                <div className="header-logout-button"> Đăng Xuất</div>
            </div>
        </div>
    );
});

export default Header;
