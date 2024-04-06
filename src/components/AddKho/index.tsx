import { FC, useState, useCallback, memo } from "react";
import CommonInput from "components/CommonInput";
import { Input } from "enums/Input";
import { Modal, Form } from "antd";
import Message from "components/Message";
import { addKhoService, editKhoService } from "./AddKhoService";

interface IKhoModalProps {
  onClose: () => void;
  isModalVisible: boolean;
  type: string;
  uid: string;
  handleRerender?: () => void;
}

const AddKho: FC<IKhoModalProps> = ({
  onClose,
  isModalVisible,
  type,
  handleRerender,
  uid,
}) => {
  const [data, setData] = useState({
    kho_id: "",
    name: "",
  });

  const handleAddProduct = useCallback(() => {
    if (!data.kho_id.trim()) Message.sendError("Vui lòng nhập mã kho");
    else if (!data.name.trim()) Message.sendError("Vui lòng nhập tên kho");
    else {
      // FETCH API
      if (type === "add") {
        addKhoService(data, uid).then((res) => {
          if (res.isSuccess) {
            Message.sendSuccess("Thêm kho thành công!");
            window.location.reload();
            handleRerender?.();
            onClose();
          } else Message.sendError(`Thêm kho thất bại: ${res.message}`);
        });
      } else {
        if (uid) {
          editKhoService(data, uid).then((res) => {
            if (res.isSuccess) {
              Message.sendSuccess("Chỉnh sửa thông tin thành công!");
              window.location.reload();
              handleRerender?.();
              onClose();
            } else
              Message.sendError(`Chỉnh sửa thông tin thất bại: ${res.message}`);
          });
        }
      }
    }
  }, [data, onClose, type, uid, handleRerender]);

  return (
    <Modal
      title={type === "edit" ? "Chỉnh sửa thông tin kho" : "Thêm kho"}
      className="add-modal"
      open={isModalVisible}
      okText={type === "edit" ? "Chỉnh sửa thông tin" : "Thêm kho"}
      cancelText="Hủy"
      onCancel={onClose}
      onOk={handleAddProduct}
      width={695}
      centered
    >
      <Form className="add-edit-form">
        <div className="personal">
          <Form.Item label="Mã kho" required>
            <CommonInput
              type={Input.TEXT}
              value={data.kho_id || ""}
              onChange={(e) =>
                setData({
                  ...data,
                  kho_id: e,
                })
              }
              placeholder={"K001"}
              className="input-item"
            />
          </Form.Item>
          <Form.Item label="Tên kho" required>
            <CommonInput
              type={Input.TEXT}
              value={data.name || ""}
              onChange={(e) =>
                setData({
                  ...data,
                  name: e,
                })
              }
              placeholder={"Tên kho"}
              className="input-item"
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};
export default memo(AddKho);
