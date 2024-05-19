import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Table from "components/Table/Table";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import Pagination from "components/Pagination";
import { DEFAULT_PAGE_SIZE, DEFAULT_URL } from "utils/constants";
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

    const setKey = (text) => {
      return text.id;
    };

    const formatQuantity = useCallback((text) => {
      return text === 0 ? (
        <p className="red bold font_italic">{text}</p>
      ) : (
        <p>{text}</p>
      );
    }, []);

    const addOrderFormat = useCallback(
      (_, text) => {
        const expireDate = -Math.ceil(
          dayjs().diff(text.hanSd) / (1000 * 60 * 60 * 24)
        );
        if (text.quantity !== 0 && expireDate > 0)
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
      },
      [orderState]
    );

    const columns = useMemo(
      () => [
        {
          title: "",
          dataIndex: "",
          key: "actionAddOrder",
          render: addOrderFormat,
        },
        {
          title: "Mã sản phẩm",
          dataIndex: "pId",
          key: "pId",
        },
        {
          title: "Tên sản phẩm",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Giá bán",
          dataIndex: "price",
          key: "price",
        },
        {
          title: "Loại Hàng",
          dataIndex: "category",
          key: "category",
        },
        {
          title: "Số lượng",
          dataIndex: "quantity",
          key: "quantity",
          render: (quantity) => formatQuantity(quantity),
        },
        {
          title: "Ngày nhập kho",
          dataIndex: "ngayNhap",
          key: "ngayNhap",
          render: (date) => formatNgayNhapHang(date),
        },
        {
          title: "Hạn sử dụng",
          dataIndex: "hanSd",
          key: "hanSd",
          render: (date) => formatHanSd(date),
        },
      ],
      [addOrderFormat, formatQuantity]
    );

    const formatNgayNhapHang = (text) => {
      return <p>{text && dayjs(text).format("DD/MM/YYYY")}</p>;
    };

    const formatHanSd = (text) => {
      const expireDate = -Math.ceil(dayjs().diff(text) / (1000 * 60 * 60 * 24));

      return expireDate <= 0 ? (
        <p className="red bold font_italic">
          {text && dayjs(text).format("DD/MM/YYYY")}
        </p>
      ) : (
        <p>{text && dayjs(text).format("DD/MM/YYYY")}</p>
      );
    };

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
              <Table columns={columns} data={data} rowKey={setKey} />
            </div>
            <Pagination
              title={"Sản Phẩm"}
              pageSize={DEFAULT_PAGE_SIZE}
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
