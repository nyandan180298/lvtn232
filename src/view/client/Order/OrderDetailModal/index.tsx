import { FC, memo } from "react";
import { Modal } from "antd";

interface IDetailOrderModalProps {
  handleCloseModal: () => void;
  detailModalVisible: boolean;
  filterStatus: (value: number) => string;
  data: {
    id: string;
    status: number;
    phoneNum: string;
    total: number;
    customer: string;
    customer_pnum: string;
    products: { product_name: string; quantity: number }[];
  };
}

const OrderDetailModal: FC<IDetailOrderModalProps> = ({
  handleCloseModal,
  detailModalVisible,
  filterStatus,
  data,
}) => {
  console.log(data);
  return (
    <Modal
      title={"Thông tin đơn hàng"}
      className="detail-modal"
      open={detailModalVisible}
      cancelText="Hủy"
      onCancel={handleCloseModal}
      onOk={handleCloseModal}
      okText={"Hoàn thành đơn hàng"}
      width={695}
      centered
    >
      <div className="detail-row">
        <div className="detail-property bold">Id đơn: </div>
        <div className="detail-value bold font_italic"> {data.id}</div>
      </div>
      <div className="detail-row">
        <div className="detail-property bold">Trạng thái</div>
        <div className="detail-value font_italic"> {filterStatus(data.status)}</div>
      </div>
      <div className="detail-row">
        <div className="detail-property bold">Tổng tiền</div>
        <div className="detail-value font_italic"> {data.total}</div>
      </div>
      <div className="detail-row">
        <div className="detail-property">
          <span className="bold">Tên khách hàng:</span> {data.customer}
        </div>
        <div className="detail-value font_italic">
          <span className="bold">Số điện thoại: </span>
          {data.customer_pnum}
        </div>
      </div>
      <div className="detail-row bold">
        <div className="detail-property"> Sản phẩm </div>
        <div className="detail-value font_italic"> Số lượng </div>
      </div>
      {data.products &&
        data.products.map((v, i) => {
          return (
            <div className="product-row" key={i}>
              <div className="product-property font_italic">
                {v.product_name}
              </div>
              <div className="product-value font_italic"> {v.quantity}</div>
            </div>
          );
        })}
    </Modal>
  );
};
export default memo(OrderDetailModal);
