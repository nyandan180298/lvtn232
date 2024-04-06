import { Button } from "antd";
import Add from "assets/AddIcon";
import AddKho from "components/AddKho";
import { Modal } from "antd";
import { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteKhoService } from "./ConfirmKhoService";
import Message from "components/Message";

const Inner = memo(({ data, handleRerender, uid }) => {
  const navigate = useNavigate();
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [kid, setKid] = useState("");

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
    console.log(kid)
    deleteKhoService(kid).then((res) => {
      if (res.isSuccess) {
        Message.sendSuccess("Xóa kho thành công!");
        window.location.reload();
        handleCloseConfirm();
      } else Message.sendError(`thất bại: ${res.message}`);
    });
  }, [kid, handleCloseConfirm]);

  return (
    <div className="chon-kho-layout">
      <div className="add-kho-container">
        <div className="add-div">
          <Button
            className="add-button"
            onClick={() => setAddModalVisible(true)}
          >
            <Add />
            Thêm Kho
          </Button>

          {addModalVisible && (
            <AddKho
              onClose={handleCloseAdd}
              isModalVisible={addModalVisible}
              type="add"
              handleRerender={handleRerender}
              uid={uid}
            />
          )}
          {editModalVisible && (
            <AddKho
              onClose={handleCloseEdit}
              isModalVisible={editModalVisible}
              type="edit"
              handleRerender={handleRerender}
              uid={uid}
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
      <div className="chon-kho-container">
        {data &&
          data.map((value) => {
            return (
              <div className="kho-pickem-container">
                <div
                  className="kho-pickem"
                  onClick={() => {
                    navigate(`/khosanpham/${value.id}`);
                  }}
                >
                  <div className="kho-pickem-row kho-id">Mã: {value?.khoId}</div>
                  <div className="kho-pickem-row"> Tên: {value?.name}</div>
                </div>
                <div className="delete-button-container">
                  <Button
                    className="delete-button"
                    onClick={() => {
                      setKid(value.id);
                      setConfirmModalVisible(true);
                    }}
                  >
                    Xóa Kho
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
