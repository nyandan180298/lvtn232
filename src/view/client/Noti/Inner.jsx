import { Modal } from "antd";
import { memo, useCallback, useState } from "react";
import SearchBar from "../KhoSanPham/SearchBar/SearchBar";

const Inner = memo(({ data, handleRerender }) => {
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const handleCloseConfirm = useCallback(() => {
    handleRerender();
    setConfirmModalVisible(false);
  }, [handleRerender]);

  return (
    <div className="noti-layout">
      <div className="search-add-customer-bar">
        <div className="search-div">
          <SearchBar />
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
            return <div className="notis-row" key={i}></div>;
          })}
      </div>
    </div>
  );
});

export default Inner;
