import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Table from "components/Table/Table";
import moment from "moment";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import SearchBar from "./SearchBar/SearchBar";
import Pagination from "components/Pagination";
import { DEFAULT_PAGE_SIZE, DEFAULT_URL } from "utils/constants";
import AddProduct from "components/AddProduct";
import Add from "assets/AddIcon";
import khoService from "services/khoService";

const _DANH_MUC_URL = `${DEFAULT_URL}/category`;
const _NN_URL = `${DEFAULT_URL}/nguon-nhap`;

const Inner = memo(({ data, onPaginate, pageObj, handleRerender, khoId }) => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [nn, setNn] = useState([]);

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

  const [pid, setPid] = useState("");

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
    return text.pId;
  };

  const editInfoFormat = (_, text) => {
    return (
      <Button
        className="edit-button"
        onClick={() => {
          setPid(text.pId);
          setEditModalVisible(true);
        }}
      >
        <EditOutlined style={{ color: "red" }} />
      </Button>
    );
  };

  const columns = useMemo(
    () => [
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
        title: "Giá nhập",
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
        title: "",
        dataIndex: "",
        key: "action",
        render: editInfoFormat,
      },
    ],
    []
  );

  const formatNgayNhapHang = (text) => {
    return <p>{text && moment(text).format("DD/MM/YYYY")}</p>;
  };

  return (
    <div className="table-container">
      <div>
        <div className="search-add-bar">
          <div className="search-div">
            <SearchBar />
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
  );
});

export default Inner;
