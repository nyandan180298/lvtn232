import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Table from "components/Table/Table";
import moment from "moment";
import { memo, useMemo } from "react";
import SearchBar from "./SearchBar/SearchBar";
import Pagination from "components/Pagination";

const Inner = memo(({ data, onPaginate, pageObj }) => {
  const formatNgayNhapHang = (text) => {
    return <p>{text && moment(text).format("DD/MM/YYYY")}</p>;
  };

  const setKey = (text) => {
    return text.uid;
  };

  const editInfoFormat = () => {
    return (
      <Button className="edit-button" onClick={() => {}}>
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

  return (
    <div className="table-container">
      <div>
        <div className="search-add-bar">
          <div className="search-div">
            <SearchBar />
          </div>
          <div className="add-div">
            <Button className="add-product-button" onClick={() => {}}>
              {/* <Add />
                        Thêm bệnh nhân */}
            </Button>
          </div>
        </div>
        <Table
          columns={columns}
          data={data}
          rowKey={setKey}
        />
      </div>
      <Pagination
        title={"Sản Phẩm"}
        pageSize={8}
        totalRow={pageObj && pageObj.total}
        currentPage={pageObj && pageObj.page}
        totalPage={pageObj && pageObj.totalPage}
        onPaginate={onPaginate}
      />
    </div>
  );
});

export default Inner;
