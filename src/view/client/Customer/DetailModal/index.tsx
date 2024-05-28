import { FC, memo } from "react";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";

interface IDetailCustomerModalProps {
  handleCloseModal: () => void;
  detailModalVisible: boolean;
  khoid: string;
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
  khoid,
}) => {
  const navigate = useNavigate();

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
            <div className="orders-history-row" key={i}>
              <div className="orders-property font_italic">id</div>
              <div
                className="orders-value font_italic"
                onClick={() => {
                  navigate(`/kho/${khoid}/don-hang/?searchid=${v}`);
                  window.location.reload();
                }}
              >
                {" "}
                {v}
              </div>
            </div>
          );
        })}
    </Modal>
  );
};
export default memo(DetailModal);
