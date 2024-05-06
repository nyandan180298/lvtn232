import { FC, memo, useCallback } from "react";
import { Button, ConfigProvider, Modal } from "antd";
import Message from "components/Message";
import {
  cancelOrderService,
  completeOrderService,
} from "../ConfirmOrderService";

interface IDetailOrderModalProps {
  handleCloseModal: () => void;
  detailModalVisible: boolean;
  filterStatus: (value: number) => string;
  handleRerender?: () => void;
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
  handleRerender,
}) => {

  const handleCompleteOrder = useCallback(() => {
    completeOrderService(data).then((res) => {
      if (res.isSuccess) {
        Message.sendSuccess(`Hoàn thành Đơn hàng ${data.id} Thành công`);
        handleRerender?.();
        handleCloseModal();
      } else Message.sendError(`Hoàn thành đơn hàng thất bại: ${res.message}`);
    });
  }, [data, handleCloseModal, handleRerender]);
  
  const handleCancelOrder = useCallback(() => {
    cancelOrderService(data).then((res) => {
      if (res.isSuccess) {
        Message.sendSuccess(`Hủy đơn hàng ${data.id} Thành công`);
        handleRerender?.();
        handleCloseModal();
      } else Message.sendError(`Hủy đơn hàng thất bại: ${res.message}`);
    });
  }, [data, handleCloseModal, handleRerender]);

  return (
    <Modal
      title={"Thông tin đơn hàng"}
      className="detail-modal"
      open={detailModalVisible}
      cancelText="Hủy"
      onCancel={handleCloseModal}
      width={695}
      footer={[
        <Button key="back" onClick={handleCloseModal}>
          Trở về
        </Button>,
        data.status === 1 && (
          <Button
            className={"complete-order-btn"}
            key="complete"
            type="primary"
            onClick={handleCompleteOrder}
          >
            Hoàn Thành Đơn Hàng
          </Button>
        ),
        data.status === 1 && (
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
              className={"cancel-order-btn"}
              key="cancel"
              type="primary"
              onClick={handleCancelOrder}
            >
              Hủy Đơn Hàng
            </Button>
          </ConfigProvider>
        ),
      ]}
      centered
    >
      <div className="detail-row">
        <div className="detail-property bold">Id đơn: </div>
        <div className="detail-value bold font_italic"> {data.id}</div>
      </div>
      <div className="detail-row">
        <div className="detail-property bold">Trạng thái</div>
        <div className="detail-value font_italic">
          {" "}
          {filterStatus(data.status)}
        </div>
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
          {data.phoneNum}
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
