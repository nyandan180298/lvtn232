import { FC, useState, useCallback, memo, useEffect } from "react";
import CommonInput from "components/CommonInput";
import { Input } from "enums/Input";
import { Modal, Form } from "antd";
import Message from "components/Message";
import { addNNService, detailNNService, editNNService } from "./AddNNService";

interface INNhapModalProps {
  onClose: () => void;
  isModalVisible: boolean;
  type: string;
  id: string;
  kho_id: string;
  handleRerender?: () => void;
}

const AddNN: FC<INNhapModalProps> = ({
  onClose,
  isModalVisible,
  type,
  handleRerender,
  id,
  kho_id,
}) => {
  const [data, setData] = useState({
    _id: "",
    name: "",
    phoneNum: "",
    kho: kho_id,
  });

  useEffect(() => {
    if (id)
      detailNNService(id).then((res) => {
        setData({
          ...res,
        });
      });
  }, [id]);

  const handleAddNN = useCallback(() => {
    if (!data.phoneNum.trim())
      Message.sendError("Vui lòng nhập tên nguồn nhập");
    else if (!data.name.trim())
      Message.sendError("Vui lòng nhập số điện thoại");
    else {
      // FETCH API
      if (type === "add") {
        addNNService(data, kho_id).then((res) => {
          if (res.isSuccess) {
            Message.sendSuccess("Thêm nguồn nhập thành công!");
            window.location.reload();
            handleRerender?.();
            onClose();
          } else Message.sendError(`Thêm nguồn nhập thất bại: ${res.message}`);
        });
      } else {
        if (id) {
          editNNService(data, id, kho_id).then((res) => {
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
  }, [data, onClose, type, id, handleRerender, kho_id]);

  return (
    <Modal
      title={
        type === "edit" ? "Chỉnh sửa thông tin nguồn nhập" : "Thêm nguồn nhập"
      }
      className="add-modal"
      open={isModalVisible}
      okText={type === "edit" ? "Chỉnh sửa thông tin" : "Thêm nguồn nhập"}
      cancelText="Hủy"
      onCancel={onClose}
      onOk={handleAddNN}
      width={695}
      centered
    >
      <Form className="add-edit-form">
        <div className="personal">
          <Form.Item label="Tên nguồn nhập" required>
            <CommonInput
              type={Input.TEXT}
              value={data.name || ""}
              onChange={(e) =>
                setData({
                  ...data,
                  name: e,
                })
              }
              placeholder={"Tên"}
              className="input-item"
            />
          </Form.Item>
          <Form.Item label="Số điện thoại" required>
            <CommonInput
              type={Input.TEXT}
              value={data.phoneNum || ""}
              onChange={(e) =>
                setData({
                  ...data,
                  phoneNum: e,
                })
              }
              placeholder={"SĐT"}
              className="input-item"
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};
export default memo(AddNN);
