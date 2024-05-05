import { Button } from "antd";
import { memo, useCallback, useState } from "react";
import SearchBar from "../KhoSanPham/SearchBar/SearchBar";
import { DEFAULT_ORDER_SIZE } from "utils/constants";
import Pagination from "components/Pagination";
import dayjs from "dayjs";
import { ArrowsAltOutlined } from "@ant-design/icons";
import OrderDetailModal from "./OrderDetailModal";

const Inner = memo(({ data, onPaginate, pageObj, handleRerender, khoId }) => {
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [detail, setDetail] = useState({});

  const filterStatus = useCallback((number) => {
    if (number === 1) {
      return "Đang giao đơn";
    } else if (number === 2) {
      return "Đơn hàng đã hoàn thành";
    } else if (number === 0) {
      return "Đơn hàng đã hủy";
    }
  }, []);

  const handleCloseConfirm = useCallback(() => {
    setDetailModalVisible(false);
  }, []);

  const formatOrderDate = (text) => {
    return dayjs(text).format("DD/MM/YYYY");
  };

  return (
    <div className="order-layout">
      <div className="search-add-customer-bar">
        <div className="search-div">
          <SearchBar />
        </div>
      </div>
      {detailModalVisible && (
        <OrderDetailModal
          handleCloseModal={handleCloseConfirm}
          detailModalVisible={detailModalVisible}
          filterStatus={filterStatus}
          data={detail}
        />
      )}
      <div className="orders">
        {data &&
          data.map((value, i) => {
            return (
              <div className="orders-form" key={i}>
                <div className="orders-row-id_status">
                  <div className="orders-id">Id đơn hàng: {value.id}</div>
                  <div className="orders-status">
                    Trạng thái:{" "}
                    <span className="bold font_italic">
                      {filterStatus(value.status)}
                    </span>
                  </div>
                </div>
                <div className="orders-row-date">
                  Ngày: {formatOrderDate(value.createdOn)}
                </div>
                <div className="orders-row-customer">
                  <div className="orders-customer">
                    Tên khách hàng: {value.customer}
                  </div>
                  <div className="orders-pnum">
                    SĐT:{" "}
                    <span className="font_italic">{value.customer_pnum}</span>
                  </div>
                </div>
                <div className="orders-row-total">
                  Tổng tiền: <span className="font_italic">{value.total}</span>
                </div>
                <div className="orders-row">
                  <Button
                    className="expand-button"
                    onClick={() => {
                      setDetail(value);
                      setDetailModalVisible(true);
                    }}
                  >
                    <ArrowsAltOutlined style={{ color: "blue" }} />
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
      <Pagination
        title={"Đơn hàng"}
        pageSize={DEFAULT_ORDER_SIZE}
        totalRow={pageObj && pageObj.total}
        currentPage={pageObj && pageObj.page}
        totalPage={pageObj && pageObj.totalPage}
        onPaginate={onPaginate}
      />
    </div>
  );
});

export default Inner;
