import { Anchor, Button } from "antd";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

const Wrapper = memo((id, khoName) => {
  const navigate = useNavigate();

  return (
    <div className="customer-header" id={`/${id.id}`}>
      <div className="header-logo">
        <img
          src={"webicon_remove_background.png"}
          alt="Web Logo"
          height={80}
        ></img>
      </div>
      <div className="homepage-header-tabs-container">
        <Anchor
          direction="horizontal"
          replace
          items={[
            {
              key: "home-anchor",
              href: "#/home",
              title: "Trang chủ",
            },
            {
              key: "about-anchor",
              href: "#/about",
              title: "Giới thiệu",
            },

            {
              key: "contact-anchor",
              href: "#/contact",
              title: "Liên hệ",
            },
            {
              key: "news-anchor",
              href: `#/${id.id}`,
              title: "Kho Hàng",
            },
          ]}
        />
      </div>
      <div className="homepage-header-buttons-container">
        <Button
          className="homepage-button reg"
          onClick={() => navigate("/register")}
        >
          Đăng ký
        </Button>
        <Button
          className="homepage-button log"
          onClick={() => navigate("/login")}
        >
          Đăng nhập
        </Button>
      </div>
    </div>
  );
});
Wrapper.displayName = "CustomerHeader";

const CustomerHeader = Wrapper;

export default CustomerHeader;
