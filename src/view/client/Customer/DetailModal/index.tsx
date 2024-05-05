import { FC, memo } from "react";
import { Modal } from "antd";

interface IDetailCustomerModalProps {
  handleCloseModal: () => void;
  detailModalVisible: boolean;
  data: {
    name: string;
    phoneNum: string;
    total: number;
    vip: number;
    ordersHistory: string[];
  };
}

const DetailModal: FC<IDetailCustomerModalProps> = ({
  handleCloseModal,
  detailModalVisible,
  data,
}) => {
  return (
    <Modal
      title={"Thông tin khách hàng"}
      className="detail-modal"
      open={detailModalVisible}
      cancelText="Hủy"
      onCancel={handleCloseModal}
      onOk={handleCloseModal}
      width={695}
      centered
    >
      <div className="detail-row">
        <div className="detail-property">Tên</div>
        <div className="detail-value"> {data.name}</div>
      </div>
      <div className="detail-row">
        <div className="detail-property">Số điện thoại</div>
        <div className="detail-value"> {data.phoneNum}</div>
      </div>
      <div className="detail-row">
        <div className="detail-property">Số tiền đã đặt hàng</div>
        <div className="detail-value"> {data.total}</div>
      </div>
      <div className="detail-row">
        <div className="detail-property">Cấp độ V.I.P</div>
        <div className="detail-value"> {data.vip}</div>
      </div>
      <div className="detail-row">
        <div className="detail-property">Lịch sử đặt hàng</div>
        <div className="detail-value"> {data.ordersHistory}</div>
      </div>
    </Modal>
  );
};
export default memo(DetailModal);
