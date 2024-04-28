import { Button } from "antd";
import Add from "assets/AddIcon";
import { memo, useCallback, useState } from "react";
import AddNN from "./AddNN";
import { Modal } from "antd";
import { deleteNNService } from "./AddNN/AddNNService";
import Message from "components/Message";

const Inner = memo(({ data, handleRerender, khoId }) => {
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [eId, setEId] = useState("");

  const handleCloseConfirm = useCallback(() => {
    handleRerender();
    setConfirmModalVisible(false);
  }, [handleRerender]);

  const handleCloseAdd = useCallback(() => {
    handleRerender();
    setAddModalVisible(false);
  }, [handleRerender]);

  const handleCloseEdit = useCallback(() => {
    handleRerender();
    setEditModalVisible(false);
  }, [handleRerender]);

  const handleDelete = useCallback(() => {
    deleteNNService(eId).then((res) => {
      if (res.isSuccess) {
        Message.sendSuccess("Xóa nguồn nhập thành công!");
        window.location.reload();
      } else Message.sendError(`thất bại: ${res.message}`);
    });
  }, [eId]);

  return (
    <div className="chon-kho-layout">
      <div className="add-kho-container">
        <div className="add-div">
          <Button
            className="add-button"
            onClick={() => setAddModalVisible(true)}
          >
            <Add />
            Thêm nguồn nhập
          </Button>

          {addModalVisible && (
            <AddNN
              onClose={handleCloseAdd}
              isModalVisible={addModalVisible}
              type="add"
              handleRerender={handleRerender}
              kho_id={khoId}
            />
          )}
          {editModalVisible && (
            <AddNN
              onClose={handleCloseEdit}
              isModalVisible={editModalVisible}
              type="edit"
              handleRerender={handleRerender}
              kho_id={khoId}
              id={eId}
            />
          )}
          {confirmModalVisible && (
            <Modal
              title={"Xác nhận xóa kho"}
              className="add-modal"
              open={confirmModalVisible}
              okText={"Xác nhận xóa"}
              cancelText="Hủy"
              onCancel={handleCloseConfirm}
              onOk={handleDelete}
              width={695}
              centered
            ></Modal>
          )}
        </div>
      </div>
      <div className="nn-big-container">
        {data &&
          data.map((value, index) => {
            return (
              <div className="nn-container" key={value._id}>
                <div
                  className={"nn-row row_" + index}
                  onClick={() => {
                    setEId(value._id);
                    setEditModalVisible(true);
                  }}
                >
                  <div className="nn-name">Tên: {value?.name}</div>
                  <div className="nn-p-num">
                    Số điện thoại: {value?.phone_num}
                  </div>
                </div>
                <div className="delete-button-container">
                  <Button
                    className="delete-nn-button"
                    onClick={() => {
                      setEId(value._id);
                      setConfirmModalVisible(true);
                    }}
                  >
                    X
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
});

export default Inner;
