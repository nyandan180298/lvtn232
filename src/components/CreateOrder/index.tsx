import { FC, useState, useCallback, memo, useEffect } from "react";
import CommonInput from "components/CommonInput";
import { Input } from "enums/Input";
import { Modal, Form, Button, ConfigProvider } from "antd";
import Message from "components/Message";
import { addOrderService } from "./AddOrderService";
import { useParams } from "react-router-dom";
import productService from "services/productService";
import { resetOrder } from "reducers/order/function";

const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

interface IModalProps {
  onClose: () => void;
  isModalVisible: boolean;
  handleRerender?: () => void;
  products: string[];
  isAdmin: string;
}

const CreateOrder: FC<IModalProps> = ({
  onClose,
  isModalVisible,
  handleRerender,
  products,
  isAdmin,
}) => {
  const param = useParams();
  const [prodArr, setProdArr] = useState([
    {
      name: "",
      id: "",
      quantity: "",
      image: {
        name: "",
        path: "",
      },
    },
  ]);
  const [data, setData] = useState({
    address: "",
    kho: "",
    customer: "",
    customer_phone_num: "",
    detail: [
      {
        product: "",
        quantity: "0",
      },
    ],
    is_admin: isAdmin,
  });

  const getProduct = useCallback(
    async (p: string[]) => {
      p.map((v, i) => {
        if (i >= data.detail.length)
          data.detail.push({ product: v, quantity: "0" });
        return v;
      });
      const res = await Promise.all(
        p.map(async (v) => {
          const res = await productService.detail(v);
          return res.data;
        })
      );
      if (res) setProdArr(res);
    },
    [data]
  );

  useEffect(() => {
    getProduct(products);
  }, [getProduct, products]);

  const handleAddOrder = useCallback(() => {
    if (!data.address.trim())
      Message.sendError("Vui lòng nhập địa chỉ đơn hàng");
    else if (!data.customer.trim())
      Message.sendError("Vui lòng nhập tên khách hàng");
    else if (!regexPhoneNumber.test(data.customer_phone_num))
      Message.sendError("SĐT khách hàng phải đúng format số điện thoại");
    else {
      // FETCH API
      addOrderService(data, param.id || "").then((res) => {
        if (res.isSuccess) {
          Message.sendSuccess("Tạo đơn hàng thành công!");
          resetOrder();
          window.location.reload();
          onClose();
        } else Message.sendError(`Tạo đơn hàng thất bại: ${res.message}`);
      });
    }
  }, [data, onClose, param.id]);

  console.log(prodArr);
  const handleRefresh = useCallback(() => {
    resetOrder();
    Message.sendSuccess("Làm mới đơn hàng thành công!");
    onClose();
  }, [onClose]);

  return (
    <Modal
      title={"Tạo đơn hàng"}
      className="add-modal"
      open={isModalVisible}
      okText={"Đồng ý tạo"}
      cancelText="Hủy"
      onCancel={onClose}
      onOk={handleAddOrder}
      width={695}
      footer={[
        <Button key="back" onClick={onClose}>
          Trở về
        </Button>,
        <Button
          className={"complete-order-btn"}
          key="complete"
          type="primary"
          onClick={handleAddOrder}
        >
          Tạo đơn hàng
        </Button>,
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
            onClick={handleRefresh}
          >
            Làm mới đơn hàng
          </Button>
        </ConfigProvider>,
      ]}
      centered
    >
      <Form className="add-edit-form">
        <div className="personal">
          <Form.Item label="Địa chỉ" required>
            <CommonInput
              type={Input.TEXT}
              value={data.address || ""}
              onChange={(e) =>
                setData({
                  ...data,
                  address: e,
                })
              }
              placeholder={"Địa chỉ"}
              className="input-item"
            />
          </Form.Item>
          <Form.Item label="Tên khách hàng" required>
            <CommonInput
              type={Input.TEXT}
              value={data.customer || ""}
              onChange={(e) =>
                setData({
                  ...data,
                  customer: e,
                })
              }
              placeholder={"Tên"}
              className="input-item"
            />
          </Form.Item>
          <Form.Item label="Số điện thoại khách hàng" required>
            <CommonInput
              type={Input.NUMBER}
              value={data.customer_phone_num || ""}
              onChange={(e) =>
                setData({
                  ...data,
                  customer_phone_num: e,
                })
              }
              placeholder="Số điện thoại"
              className="input-item"
            />
          </Form.Item>
          {prodArr.map((v, i) => {
            const detailIndex = i;
            let fp;
            if (v.image) fp = v.image.path.split("\\")[2];
            return (
              <div className="products-input" key={i}>
                <div className="product-name">
                  {" "}
                  Tên sản phẩm: {v.name} | Số Lượng {v.quantity}
                  <img
                    src={`http://localhost:3001/image/use/${fp}`}
                    alt={`${v.image.name}`}
                    height={50}
                    className="product-image"
                  ></img>
                </div>
                <Form.Item label="Số Lượng" required>
                  <CommonInput
                    type={Input.NUMBER}
                    value={data.detail[i].quantity || ""}
                    onChange={(e) => {
                      const newQuantity = e;
                      if (newQuantity > v.quantity) {
                        setData((prevData) => ({
                          ...prevData,
                          detail: prevData.detail.map((detail, i) => {
                            if (i === detailIndex) {
                              return {
                                ...detail,
                                product: v.id,
                                quantity: "0",
                              };
                            }
                            return detail;
                          }),
                        }));
                        Message.sendError(
                          `Số lượng mới nhập lớn hơn số lượng sản phẩm trong kho`
                        );
                      } else {
                        setData((prevData) => ({
                          ...prevData,
                          detail: prevData.detail.map((detail, i) => {
                            if (i === detailIndex) {
                              return {
                                ...detail,
                                product: v.id,
                                quantity: newQuantity,
                              };
                            }
                            return detail;
                          }),
                        }));
                      }
                    }}
                    placeholder="Số Lượng"
                    className="input-item"
                  />
                </Form.Item>
              </div>
            );
          })}
        </div>
      </Form>
    </Modal>
  );
};

export default memo(CreateOrder);
