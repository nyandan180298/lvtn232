import { Button, ConfigProvider, Modal } from "antd";
import Pagination from "components/Pagination";
import { memo, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { DEFAULT_NOTI_SIZE } from "utils/constants";

const Inner = memo(
  ({
    data,
    handleRerender,
    pageObj,
    onPaginate,
    handleReadOneNoti,
    handleReadAllNoti,
  }) => {
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [filtered, setFilterd] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
      if (searchParams.toString().split("=").includes("filter")) {
        setFilterd(true);
      }
    }, [searchParams]);

    const filterIsRead = useCallback((bool) => {
      if (bool === true) {
        return "Đã đọc";
      } else if (bool === false) {
        return "Chưa đọc";
      }
    }, []);

    const formatNotiDate = (text) => {
      return dayjs(text).format("DD/MM/YYYY");
    };

    const handleFiltered = useCallback(() => {
      if (!filtered) {
        searchParams.set("filter", 0);
      } else {
        searchParams.delete("filter");
      }
      setSearchParams(searchParams);
      setFilterd(!filtered);
      handleRerender();
    }, [filtered, handleRerender, setSearchParams, searchParams]);

    const handleCloseConfirm = useCallback(() => {
      handleRerender();
      setConfirmModalVisible(false);
    }, [handleRerender]);

    return (
      <div className="order-layout">
        <div className="noti-bar">
          <div className="unread-div">
            <ConfigProvider
              key="read"
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
                Thông báo chưa đọc
              </Button>
            </ConfigProvider>
          </div>
          <div className="filter-div">
            <ConfigProvider
              key="read"
              theme={{
                components: {
                  Button: {
                    colorPrimaryHover: `black`,
                  },
                },
              }}
            >
              <Button
                className={"read-all-button"}
                onClick={() => {
                  handleReadAllNoti();
                }}
              >
                Đánh dấu đọc hết tất cả thông báo
              </Button>
            </ConfigProvider>
          </div>
        </div>
        {confirmModalVisible && (
          <Modal
            title={"Thông tin đơn hàng"}
            className="noti-detail-modal"
            open={confirmModalVisible}
            okText={"Xác nhận xóa"}
            cancelText="Hủy"
            onCancel={handleCloseConfirm}
            width={695}
            centered
          ></Modal>
        )}
        <div className="notis">
          {data &&
            data.map((value, i) => {
              return (
                <div
                  className={`notis-form is_read_` + value.isRead}
                  key={i}
                  onClick={() => {
                    if (!value.isRead) {
                      handleReadOneNoti(value);
                    }
                  }}
                >
                  <div className="notis-row-id_status ">
                    <div className="notis-row-date">
                      Ngày: {formatNotiDate(value.sentOn)}
                    </div>
                    <div className="notis-status">
                      Trạng thái:{" "}
                      <span className="bold font_italic">
                        {filterIsRead(value.isRead)}
                      </span>
                    </div>
                  </div>
                  <div className="notis-row-message">
                    <div className="notis-message">
                      Tin nhắn:{" "}
                      <span className="font_italic">{value.message}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          {!data && (
            <div className={`notis-form`}>
              <div className="notis-row-no-message">
                <div className="notis-no-message">
                  Hiện tại không có thông báo
                </div>
              </div>
            </div>
          )}
        </div>
        {pageObj.total !== 0 && (
          <Pagination
            title={"Thông báo"}
            pageSize={DEFAULT_NOTI_SIZE}
            totalRow={pageObj && pageObj.total}
            currentPage={pageObj && pageObj.page}
            totalPage={pageObj && pageObj.totalPage}
            onPaginate={onPaginate}
          />
        )}
      </div>
    );
  }
);

export default Inner;
