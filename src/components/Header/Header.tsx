import { FC, memo, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrder } from "reducers/order/function";
import { connect } from "react-redux";
import notiService from "services/notiService";
import { BellOutlined } from "@ant-design/icons";

interface IHeaderProps {
  sname: string;
  spos: string;
  order: any;
}

const Header: FC<IHeaderProps> = memo(({ sname, order }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [data, setData] = useState(0);

  const getUnreadNoti = useCallback(async (body: any) => {
    const res = await notiService.getUnread(body);
    if (!res.data) {
      setData(0);
    } else {
      setData(res.data.total);
    }
  }, []);

  useEffect(() => {
    getUnreadNoti({ khoid: params.id });
  }, [getUnreadNoti, params.id]);

  const getProductOrder = useCallback(() => {
    const result = getOrder();
    setProducts(result);
  }, []);

  const handleClickHome = useCallback(() => {
    navigate("/kho");
    navigate(0);
  }, [navigate]);

  const handleClickLogout = useCallback(() => {
    navigate("/logout");
    navigate(0);
  }, [navigate]);

  useEffect(() => {
    getProductOrder();
  }, [getProductOrder, order]);

  return (
    <div className="header">
      <div className="header-icon-container">
        <div className="header-logo" onClick={handleClickHome}>
          <img
            src={"webicon_remove_background.png"}
            alt="Web Logo"
            height={130}
          ></img>
        </div>
        <div className="header-logo-text" onClick={handleClickHome}>
          SMART INVENTORY
        </div>
      </div>
      <div className="header-middle-container">
        {sname && <div className="staff-name"> Tên tài khoản: {sname} </div>}
      </div>
      <div className="header-button-container">
        <div className="header-order-displayer">
          Đơn hàng hiện tại: {products?.length}
        </div>
        <div className="noti-container">
          <BellOutlined
            className="bell"
            onClick={() => {
              navigate(`/kho/${params.id}/thong-bao`);
              window.location.reload();
            }}
          />
          {data !== 0 && <div className="noti-number">{data}</div>}
        </div>
        <div className="header-logout-button" onClick={handleClickLogout}>
          Đăng Xuất
        </div>
      </div>
    </div>
  );
});

const mapStateToProps = (state: any) => {
  return { order: state.order };
};

export default connect(mapStateToProps)(Header);
