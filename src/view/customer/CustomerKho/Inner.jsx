import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { memo, useCallback, useEffect, useState } from "react";
import Pagination from "components/Pagination";
import { DEFAULT_PRODUCT_SIZE, DEFAULT_URL } from "utils/constants";
import Add from "assets/AddIcon";
import {
  getOrder,
  removeOrderProduct,
  updateOrderProduct,
} from "reducers/order/function";
import Message from "components/Message";
import { connect } from "react-redux";
import SearchBar from "view/client/KhoSanPham/SearchBar/SearchBar";
import FilterMenu from "view/client/KhoSanPham/FilterMenu/FilterMenu";
import CustomerHeader from "./CustomerHeader";
import CreateOrder from "components/CreateOrder";
import dayjs from "dayjs";
import CardContainer from "components/CardContainer/CardContainer";

const _DANH_MUC_URL = `${DEFAULT_URL}/category`;

const Inner = memo(
  ({ data, onPaginate, pageObj, handleRerender, khoId, order }) => {
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [orderState, setOrderState] = useState([]);

    const getProducts = useCallback(() => {
      setProducts(getOrder());
    }, []);

    const handleClick = useCallback(() => {
      if (products.length !== 0) setAddModalVisible(true);
      else Message.sendInfo("Không có Sản phẩm nào được chọn trong đơn hàng");
    }, [products]);

    const getCategories = useCallback(async () => {
      const ctg = await fetch(`${_DANH_MUC_URL}/getAll`);
      const resCtg = await ctg.json();
      if (resCtg) setCategories(resCtg.data);
    }, []);

    useEffect(() => {
      getProducts();
      setOrderState(order.products);
    }, [order, getProducts]);

    useEffect(() => {
      getCategories();
    }, [getCategories]);

    const handleCloseAdd = useCallback(() => {
      handleRerender();
      setAddModalVisible(false);
    }, [handleRerender]);

    const addOrderFormat = useCallback(
      (_, text) => {
        const expireDate = -Math.ceil(
          dayjs().diff(text.hanSd) / (1000 * 60 * 60 * 24)
        );
        if (text.quantity !== 0 && expireDate > 0) {
          return orderState.includes(text.id) ? (
            <Button
              className="add-order-button"
              onClick={() => {
                removeOrderProduct(text.id);
                Message.sendSuccess(
                  `Xóa sản phẩm ${text.name} ra khỏi đơn thành công`
                );
              }}
            >
              <MinusOutlined style={{ color: "black" }} />
            </Button>
          ) : (
            <Button
              className="add-order-button"
              onClick={() => {
                updateOrderProduct(text.id);
                Message.sendSuccess(`Thêm sản phẩm ${text.name} thành công`);
              }}
            >
              <PlusOutlined style={{ color: "black" }} />
            </Button>
          );
        } else {
          return <div className="blank"></div>;
        }
      },
      [orderState]
    );

    return (
      <div className="customer-kho-san-pham-container">
        <CustomerHeader id={khoId} />
        <div className="customer-main-container">
          <div className="table-container">
            <div>
              <div className="search-add-bar">
                <div className="search-div">
                  <SearchBar />
                </div>
                <div className="header-order-displayer">
                  Đơn hàng hiện tại: {products?.length}
                </div>
                <div className="add-div">
                  <Button className="add-button" onClick={() => handleClick()}>
                    <Add />
                    Tạo đơn hàng
                  </Button>
                </div>
                {addModalVisible && (
                  <CreateOrder
                    isModalVisible={addModalVisible}
                    onClose={handleCloseAdd}
                    handleRerender={handleRerender}
                    products={products}
                    isAdmin={"0"}
                  />
                )}
              </div>
              <div className="filter-div">
                <FilterMenu
                  categories={categories}
                  handleRerender={handleRerender}
                />
              </div>
              <CardContainer data={data} addOrderFormat={addOrderFormat} />
            </div>
            <Pagination
              title={"Sản Phẩm"}
              pageSize={DEFAULT_PRODUCT_SIZE}
              totalRow={pageObj && pageObj.total}
              currentPage={pageObj && pageObj.page}
              totalPage={pageObj && pageObj.totalPage}
              onPaginate={onPaginate}
            />
          </div>
        </div>
      </div>
    );
  }
);

const mapStateToProps = (state) => {
  return { order: state.order };
};

export default connect(mapStateToProps)(Inner);
