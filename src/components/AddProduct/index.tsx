import { FC, useState, useCallback, memo, useEffect } from "react";
import CommonInput from "components/CommonInput";
import { Input } from "enums/Input";
import { Modal, Form, UploadProps, Upload, Button } from "antd";
import Message from "components/Message";
import {
  addProductService,
  deleteImageService,
  detailProductService,
  editProductService,
} from "./AddProductService";
import { DEFAULT_URL } from "utils/constants";
import { UploadOutlined } from "@ant-design/icons";

interface IModalProps {
  onClose: () => void;
  isModalVisible: boolean;
  type: string;
  khoid: string;
  pid?: string;
  categories?: [];
  nNs?: [];
  handleRerender?: () => void;
}

const props: UploadProps = {
  name: "file",
  multiple: false,
  headers: {
    authorization: "authorization-text",
    "Access-Control-Allow-Origin": "*",
  },
  maxCount: 1,
  action: `${DEFAULT_URL}/image/upload`,
  listType: "picture",
};

const AddProduct: FC<IModalProps> = ({
  onClose,
  isModalVisible,
  type,
  handleRerender,
  pid,
  khoid,
  categories,
  nNs,
}) => {
  const [data, setData] = useState({
    pId: "",
    name: "",
    quantity: "",
    price: "",
    ngayNhap: "",
    hanSd: "",
    category: "",
    nguonNhap: "",
    kho: khoid,
    image: {
      name: "",
      path: "",
    },
  });

  useEffect(() => {
    if (pid)
      detailProductService(pid).then((res) => {
        setData({
          ...res,
        });
      });
  }, [pid]);

  const removeFile = useCallback((fp: string) => {
    deleteImageService(fp).then((res) => {
      if (res.isSuccess) {
        Message.sendSuccess("Xóa hình thành công!");
      } else Message.sendError(`Thất bại: ${res.message}`);
    });
  }, []);

  const handleAddProduct = useCallback(() => {
    if (!data.pId.trim()) Message.sendError("Vui lòng nhập mã sản phẩm");
    else if (!data.name.trim()) Message.sendError("Vui lòng nhập tên sản phẩm");
    else if (!data.ngayNhap.trim())
      Message.sendError("Vui lòng nhập ngày nhập hàng");
    else if (!data.hanSd.trim()) Message.sendError("Vui lòng nhập hạn sử dụng");
    else if (!/^\d+$/.test(data.quantity))
      Message.sendError("Số lượng phải là số");
    else if (!/^\d+$/.test(data.price)) Message.sendError("Giá phải là số");
    else {
      // FETCH API
      if (type === "add") {
        addProductService(data, khoid).then((res) => {
          if (res.isSuccess) {
            Message.sendSuccess("Thêm sản phẩm thành công!");
            handleRerender?.();
            onClose();
          } else Message.sendError(`Thêm sản phẩm thất bại: ${res.message}`);
        });
      } else {
        if (pid) {
          editProductService(data, pid).then((res) => {
            if (res.isSuccess) {
              Message.sendSuccess("Chỉnh sửa thông tin thành công!");
              handleRerender?.();
              onClose();
            } else
              Message.sendError(`Chỉnh sửa thông tin thất bại: ${res.message}`);
          });
        }
      }
    }
  }, [data, onClose, type, pid, handleRerender, khoid]);

  return (
    <Modal
      title={type === "edit" ? "Chỉnh sửa thông tin sản phẩm" : "Thêm sản phẩm"}
      className="add-modal"
      open={isModalVisible}
      okText={type === "edit" ? "Chỉnh sửa thông tin" : "Thêm sản phẩm"}
      cancelText="Hủy"
      onCancel={onClose}
      onOk={handleAddProduct}
      width={695}
      centered
    >
      <Form className="add-edit-form">
        <div className="personal">
          <Form.Item label="Mã sản phẩm" required>
            <CommonInput
              type={Input.TEXT}
              value={data.pId || ""}
              onChange={(e) =>
                setData({
                  ...data,
                  pId: e,
                })
              }
              placeholder={"P001"}
              className="input-item"
            />
          </Form.Item>
          <Form.Item label="Tên sản phẩm" required>
            <CommonInput
              type={Input.TEXT}
              value={data.name || ""}
              onChange={(e) =>
                setData({
                  ...data,
                  name: e,
                })
              }
              placeholder={"Sản Phẩm"}
              className="input-item"
            />
          </Form.Item>

          <Form.Item label="Giá sản phẩm" required>
            <CommonInput
              type={Input.NUMBER}
              value={data.price || ""}
              onChange={(e) =>
                setData({
                  ...data,
                  price: e,
                })
              }
              placeholder="Giá sản phẩm"
              className="input-item"
            />
          </Form.Item>
          <Form.Item label="Số lượng" required>
            <CommonInput
              type={Input.NUMBER}
              value={data.quantity || ""}
              onChange={(e) =>
                setData({
                  ...data,
                  quantity: e,
                })
              }
              placeholder="Số lượng"
              className="input-item"
            />
          </Form.Item>
          <Form.Item label="Ngày nhập hàng" required>
            <CommonInput
              type={Input.DATETIME}
              value={data.ngayNhap || ""}
              onChange={(e) =>
                setData({
                  ...data,
                  ngayNhap: e,
                })
              }
              placeholder="DD/MM/YYYY HH:mm"
              className="input-item"
            />
          </Form.Item>
          <Form.Item label="Hạn sử dụng" required>
            <CommonInput
              type={Input.DATETIME}
              value={data.hanSd || ""}
              onChange={(e) =>
                setData({
                  ...data,
                  hanSd: e,
                })
              }
              placeholder="DD/MM/YYYY HH:mm"
              className="input-item"
            />
          </Form.Item>
          {categories && (
            <Form.Item label="Danh Mục" required>
              <CommonInput
                type={Input.SELECT}
                value={data.category}
                onChange={(e) =>
                  setData({
                    ...data,
                    category: e,
                  })
                }
                placeholder="Thực phẩm"
                className="input-item"
                options={categories.map((value: any, index) => {
                  return {
                    key: index,
                    value: value._id,
                    label: value.name,
                  };
                })}
              />
            </Form.Item>
          )}
          {nNs && (
            <Form.Item label="Nguồn Nhập" required>
              <CommonInput
                type={Input.SELECT}
                value={data.nguonNhap}
                onChange={(e) =>
                  setData({
                    ...data,
                    nguonNhap: e,
                  })
                }
                placeholder="Nguồn Nhập"
                className="input-item"
                options={nNs.map((value: any, index) => {
                  return {
                    key: index,
                    value: value._id,
                    label: value.name,
                  };
                })}
              />
            </Form.Item>
          )}
          <Form.Item label="Hình ảnh" required>
            <Upload
              {...props}
              onChange={(info) => {
                if (info.file.status !== "uploading") {
                }
                if (info.file.status === "done") {
                  setData({
                    ...data,
                    image: {
                      name: info.file.name,
                      path: info.file.response.data.filepath,
                    },
                  });
                  Message.sendSuccess(
                    `${info.file.name} file uploaded successfully`
                  );
                } else if (info.file.status === "error") {
                  Message.sendError(`${info.file.name} file upload failed.`);
                }
              }}
              onRemove={(info) => {
                const fp = info.response.data.filepath.split("\\")[2];
                if (info) {
                  removeFile(fp);
                }
              }}
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};
export default memo(AddProduct);
