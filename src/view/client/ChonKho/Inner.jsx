import { Button } from "antd";
import Add from "assets/AddIcon";
import AddKho from "components/AddKho";
import { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const Inner = memo(({ data, handleRerender, uid }) => {
  const navigate = useNavigate();
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const handleCloseAdd = useCallback(() => {
    handleRerender();
    setAddModalVisible(false);
  }, [handleRerender]);

  const handleCloseEdit = useCallback(() => {
    handleRerender();
    setEditModalVisible(false);
  }, [handleRerender]);

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
        </div>
      </div>
      <div className="chon-kho-container">
        {data &&
          data.map((value) => {
            return (
              <div
                className="kho-pickem"
                onClick={() => {
                  navigate(`/khosanpham/${value.id}`);
                }}
              >
                <div className="kho-pickem-row kho-id"> Mã: {value.khoId}</div>
                <div className="kho-pickem-row"> Tên: {value.name}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
});

export default Inner;
