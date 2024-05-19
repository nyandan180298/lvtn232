import { Button, ConfigProvider } from "antd";
import { memo, useCallback, useEffect, useState } from "react";
import SearchBar from "../KhoSanPham/SearchBar/SearchBar";
import { DEFAULT_ORDER_SIZE } from "utils/constants";
import Pagination from "components/Pagination";
import dayjs from "dayjs";
import { ArrowsAltOutlined } from "@ant-design/icons";
import OrderDetailModal from "./OrderDetailModal";
import { useSearchParams } from "react-router-dom";

const Inner = memo(({ data, onPaginate, pageObj, handleRerender, khoId }) => {
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [detail, setDetail] = useState({});
  const [filtered, setFilterd] = useState(false);
  const [filteredConfirm, setFilterdConfirm] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.toString().split("=").includes("filter")) {
      setFilterd(true);
    }
    if (searchParams.toString().split("=").includes("filter_confirm")) {
      setFilterdConfirm(true);
    }
  }, [searchParams]);

  const handleFiltered = useCallback(() => {
    if (!filtered) {
      searchParams.set("filter", 1);
    } else {
      searchParams.delete("filter");
    }
    setSearchParams(searchParams);
    setFilterd(!filtered);
    handleRerender();
  }, [filtered, handleRerender, setSearchParams, searchParams]);

  const handleFilteredConfirm = useCallback(() => {
    if (!filteredConfirm) {
      searchParams.set("filter_confirm", false);
    } else {
      searchParams.delete("filter_confirm");
    }
    setSearchParams(searchParams);
    setFilterdConfirm(!filteredConfirm);
    handleRerender();
  }, [filteredConfirm, handleRerender, setSearchParams, searchParams]);

  const filterStatus = useCallback((number) => {
    if (number === 1) {
      return "Đang giao đơn";
    } else if (number === 2) {
      return "Đơn hàng đã hoàn thành";
    } else if (number === 0) {
      return "Đơn hàng đã hủy";
    }
  }, []);

  const filterConfirm = useCallback((confirm) => {
    if (confirm === true) {
      return "Đã xác nhận";
    } else {
      return "Chưa xác nhận";
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
        <div className="filter-div">
          <ConfigProvider
            key="cancel"
            theme={{
              components: {
                Button: {
                  colorPrimaryHover: `black`,
                },
              },
            }}
          >
            <Button
              className={"filter-order-button-" + filtered}
              onClick={handleFiltered}
            >
              Đang giao hàng
            </Button>
          </ConfigProvider>
        </div>
        <div className="filter-div">
          <ConfigProvider
            key="cancel"
            theme={{
              components: {
                Button: {
                  colorPrimaryHover: `black`,
                },
              },
            }}
          >
            <Button
              className={"filter-order-button-" + filteredConfirm}
              onClick={handleFilteredConfirm}
            >
              Chưa xác nhận
            </Button>
          </ConfigProvider>
        </div>
      </div>
      {detailModalVisible && (
        <OrderDetailModal
          handleCloseModal={handleCloseConfirm}
          detailModalVisible={detailModalVisible}
          filterStatus={filterStatus}
          filterConfirm={filterConfirm}
          data={detail}
          handleRerender={handleRerender}
        />
      )}
      <div className="orders">
        {data &&
          data.map((value, i) => {
            return (
              <div className="orders-form" key={i}>
                <div className="orders-row-id_status ">
                  <div className="orders-id text-blue">
                    Id đơn hàng: {value.id}
                  </div>
                  <div className="orders-status">
                    Trạng thái:{" "}
                    <span className="bold font_italic">
                      {filterStatus(value.status)}
                    </span>
                  </div>
                </div>
                <div className="orders-row-id_status ">
                  <div className="orders-row-date">
                    Ngày: {formatOrderDate(value.createdOn)}
                  </div>
                  <div className="orders-status">
                    Xác nhận đơn hàng:{" "}
                    <span className="bold font_italic">
                      {filterConfirm(value.isConfirm)}
                    </span>
                  </div>
                </div>
                <div className="orders-row-address">
                  <div className="orders-address bold font_italic">
                    Địa chỉ: {value.address}
                  </div>
                </div>
                <div className="orders-row-customer">
                  <div className="orders-customer">
                    Tên khách hàng: {value.customer}
                  </div>
                  <div className="orders-pnum">
                    SĐT: <span className="font_italic">{value.phoneNum}</span>
                  </div>
                </div>
                <div className="orders-row-total text-blue">
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
                    <ArrowsAltOutlined style={{ color: "red" }} />
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
