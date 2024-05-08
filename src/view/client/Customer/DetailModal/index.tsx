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
  console.log(data)

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
        <div className="detail-property bold">Tên</div>
        <div className="detail-value font_italic"> {data.name}</div>
      </div>
      <div className="detail-row">
        <div className="detail-property bold">Số điện thoại</div>
        <div className="detail-value font_italic"> {data.phoneNum}</div>
      </div>
      <div className="detail-row">
        <div className="detail-property bold">Số tiền đã đặt hàng</div>
        <div className="detail-value font_italic"> {data.total}</div>
      </div>
      <div className="detail-row">
        <div className="detail-property bold">Cấp độ V.I.P</div>
        <div className="detail-value font_italic"> {data.vip}</div>
      </div>
      
      <div className="detail-row">
        <div className="detail-property bold">Lịch sử đặt hàng</div>
        <div className="detail-value font_italic"> </div>
      </div>
      {data.ordersHistory &&
        data.ordersHistory.slice(0, 5).map((v, i) => {
          return (
            <div className="product-row" key={i}>
              <div className="product-property font_italic">
                id
              </div>
              <div className="product-value font_italic"> {v}</div>
            </div>
          );
        })}
    </Modal>
  );
};
export default memo(DetailModal);
