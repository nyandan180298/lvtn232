import {
  EditOutlined,
  IdcardOutlined,
  MinusOutlined,
  PlusOutlined,
  TableOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import Table from "components/Table/Table";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import SearchBar from "./SearchBar/SearchBar";
import Pagination from "components/Pagination";
import { DEFAULT_PRODUCT_SIZE, DEFAULT_URL } from "utils/constants";
import AddProduct from "components/AddProduct";
import Add from "assets/AddIcon";
import khoService from "services/khoService";
import {
  removeOrderProduct,
  updateOrderProduct,
} from "reducers/order/function";
import Message from "components/Message";
import { connect } from "react-redux";
import FilterMenu from "./FilterMenu/FilterMenu";
import dayjs from "dayjs";
import CardContainer from "components/CardContainer/CardContainer";

const _DANH_MUC_URL = `${DEFAULT_URL}/category`;
const _NN_URL = `${DEFAULT_URL}/nguon-nhap`;
const _URL = "https://lvtn-2024.web.app/"

const Inner = memo(
  ({ data, onPaginate, pageObj, handleRerender, khoId, order }) => {
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const [nn, setNn] = useState([]);
    const [pid, setPid] = useState("");
    const [orderState, setOrderState] = useState([]);
    const [viewTableState, setViewTableState] = useState(true);

    const getCategories = useCallback(async () => {
      const ctg = await fetch(`${_DANH_MUC_URL}/getAll`);
      const resCtg = await ctg.json();
      if (resCtg) setCategories(resCtg.data);
    }, []);

    const getNn = useCallback(async () => {
      const kho = await khoService.detail(khoId);
      const nn = kho.data.nguonNhaps;
      const arr = await Promise.all(
        nn.map(async (value) => {
          const nguon_nhap = await fetch(`${_NN_URL}/get/${value}`);
          const resNguon_nhap = await nguon_nhap.json();
          return {
            _id: resNguon_nhap.data._id,
            name: resNguon_nhap.data.name,
            phone_num: resNguon_nhap.data.phone_num,
          };
        })
      );
      if (arr) setNn(arr);
    }, [khoId]);

    useEffect(() => {
      setOrderState(order.products);
    }, [order]);

    useEffect(() => {
      getCategories();
      getNn();
    }, [getCategories, getNn]);

    const handleCloseAdd = useCallback(() => {
      handleRerender();
      setAddModalVisible(false);
    }, [handleRerender]);

    const handleCloseEdit = useCallback(() => {
      handleRerender();
      setEditModalVisible(false);
    }, [handleRerender]);

    const setKey = (text) => {
      return text.id;
    };

    const editInfoFormat = useCallback((_, text) => {
      return (
        <Button
          className="edit-button"
          onClick={() => {
            setPid(text.id);
            setEditModalVisible(true);
          }}
        >
          <EditOutlined style={{ color: "red" }} />
        </Button>
      );
    }, []);

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
          title: "Nguồn nhập",
          dataIndex: "nguonNhap",
          key: "nguonNhap",
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
        {
          title: "",
          dataIndex: "",
          key: "action",
          render: editInfoFormat,
        },
      ],
      [addOrderFormat, editInfoFormat, formatQuantity]
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
      <div className="table-container">
        <div>
          <div className="search-add-bar">
            <div className="search-div">
              <SearchBar />
              <a className="link-customer" href={`${_URL}/#/${khoId}`}>
                Link <UserOutlined />
              </a>
            </div>
            <div className="add-div">
              <Button
                className="add-button"
                onClick={() => setAddModalVisible(true)}
              >
                <Add />
                Thêm Sản Phẩm
              </Button>
            </div>
            {addModalVisible && (
              <AddProduct
                onClose={handleCloseAdd}
                isModalVisible={addModalVisible}
                type="add"
                khoid={khoId}
                categories={categories}
                nNs={nn}
              />
            )}
            {editModalVisible && (
              <AddProduct
                onClose={handleCloseEdit}
                isModalVisible={editModalVisible}
                type="edit"
                khoid={khoId}
                categories={categories}
                nNs={nn}
                pid={pid}
              />
            )}
          </div>
          <div className="filter-div">
            <FilterMenu
              categories={categories}
              handleRerender={handleRerender}
            />
            <div className="views-switch">
              <div
                className={`view-button` + (viewTableState ? "_active" : "")}
              >
                <TableOutlined onClick={() => setViewTableState(true)} />
              </div>
              <div
                className={`view-button` + (viewTableState ? "" : "_active")}
              >
                <IdcardOutlined onClick={() => setViewTableState(false)} />
              </div>
            </div>
          </div>
          {viewTableState ? (
            <Table columns={columns} data={data} rowKey={setKey} />
          ) : (
            <CardContainer data={data} addOrderFormat={addOrderFormat} />
          )}
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
    );
  }
);

const mapStateToProps = (state) => {
  return { order: state.order };
};

export default connect(mapStateToProps)(Inner);
