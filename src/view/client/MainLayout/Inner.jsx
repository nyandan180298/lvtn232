import { FloatButton } from "antd";
import CreateOrder from "components/CreateOrder";
import Header from "components/Header/Header";
import LeftMenu from "components/LeftMenu";
import { memo, useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getOrder } from "reducers/order/function";
import userService from "services/userService";
import { connect } from "react-redux";
import Message from "components/Message";

const Inner = memo((order) => {
  const [staffName, setStaffName] = useState("");
  const [products, setProducts] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);

  const handleClick = useCallback(() => {
    if (products.length !== 0) setCreateModalVisible(true);
    else Message.sendInfo("Không có Sản phẩm nào được chọn trong đơn hàng");
  }, [products]);

  const onClose = useCallback(() => {
    setCreateModalVisible(false);
  }, []);

  const handleRerender = useCallback(() => {
    setRerender(!rerender);
  }, [rerender]);

  const getProducts = useCallback(() => {
    setProducts(getOrder());
  }, []);

  const getUser = useCallback(async () => {
    const res = await userService.me();
    const name = res.data?.firstName + " " + res.data?.lastName;
    setStaffName(name);
  }, []);

  useEffect(() => {
    getProducts();
    getUser();
  }, [getUser, rerender, getProducts, order]);

  return (
    <div className="main-layout">
      <Header sname={staffName} />
      <div className="main-container">
        <div className="detail-left-container">
          <LeftMenu />
        </div>
        <div className="detail-right-container">
          <Outlet />
        </div>
      </div>
      <FloatButton tooltip={<div>Tạo đơn hàng</div>} onClick={handleClick} />
      {createModalVisible && (
        <CreateOrder
          isModalVisible={createModalVisible}
          onClose={onClose}
          handleRerender={handleRerender}
          products={products}
          isAdmin={'1'}
        />
      )}
    </div>
  );
});

const mapStateToProps = (state) => {
  return { order: state.order };
};

export default connect(mapStateToProps)(Inner);
