import { memo, useCallback, useMemo, useState } from "react";
import SearchBar from "../KhoSanPham/SearchBar/SearchBar";
import Pagination from "components/Pagination";
import { DEFAULT_PAGE_SIZE } from "utils/constants";
import Table from "components/Table/Table";
import { Button } from "antd";
import { ArrowsAltOutlined } from "@ant-design/icons";
import DetailModal from "./DetailModal";

const Inner = memo(({ data, handleRerender, khoId, pageObj, onPaginate }) => {
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [detail, setDetail] = useState("");
  const setKey = (text) => {
    return text.id;
  };

  const openDetailModelFormat = (_, text) => {
    return (
      <Button
        className="edit-button"
        onClick={() => {
          setDetail(text);
          setDetailModalVisible(true);
        }}
      >
        <ArrowsAltOutlined style={{ color: "blue" }} />
      </Button>
    );
  };

  const columns = useMemo(
    () => [
      {
        title: "",
        dataIndex: "index",
        key: "index",
      },
      {
        title: "Tên khách hàng",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Số điện thoại",
        dataIndex: "phoneNum",
        key: "phoneNum",
      },
      {
        title: "Số tiền tổng đã đặt",
        dataIndex: "total",
        key: "total",
      },
      {
        title: "Cấp VIP",
        dataIndex: "vip",
        key: "vip",
      },
      {
        title: "",
        dataIndex: "",
        key: "action",
        render: openDetailModelFormat,
      },
    ],
    []
  );

  const handleCloseModal = useCallback(() => {
    handleRerender();
    setDetailModalVisible(false);
  }, [handleRerender]);

  return (
    <div className="chon-kho-layout">
      <div className="search-add-customer-bar">
        <div className="search-div">
          <SearchBar />
        </div>
      </div>
      <div className="customer-big-container">
        <Table columns={columns} data={data} rowKey={setKey} />
        {detailModalVisible && (
          <DetailModal
            handleCloseModal={handleCloseModal}
            detailModalVisible={detailModalVisible}
            data={detail}
            khoid={khoId}
          />
        )}
      </div>
      <Pagination
        title={"Khách hàng"}
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
