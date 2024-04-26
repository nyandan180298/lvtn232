import { Button } from "antd";
import Add from "assets/AddIcon";
import { memo, useCallback, useState } from "react";
import AddNN from "./AddNN";
import { useParams } from "react-router-dom";

const Inner = memo(({ data, handleRerender, khoId }) => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [eId, setEId] = useState("")
  const param = useParams();

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
            Thêm nguồn nhập
          </Button>

          {addModalVisible && (
            <AddNN
              onClose={handleCloseAdd}
              isModalVisible={addModalVisible}
              type="add"
              handleRerender={handleRerender}
            />
          )}
          {editModalVisible && (
            <AddNN
              onClose={handleCloseEdit}
              isModalVisible={editModalVisible}
              type="edit"
              handleRerender={handleRerender}
              kho_id={param.id}
              id={eId}
            />
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
                    setEId(value._id)
                    setEditModalVisible(true);
                  }}
                >
                  <div className="nn-name">Tên: {value?.name}</div>
                  <div className="nn-p-num">
                    Số điện thoại: {value?.phone_num}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
});

export default Inner;
