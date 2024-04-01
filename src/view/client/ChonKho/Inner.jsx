import { memo } from "react";
import { useNavigate } from "react-router-dom";

const Inner = memo((data) => {
  const navigate = useNavigate();

  return (
    <div className="chon-kho-layout">
      {data &&
        data.data.map((value) => {
          return (
            <div
              className="kho-pickem"
              onClick={() => {
                navigate(`/khosanpham/${value.id}`);
              }}
            >
              <div className="kho-pickem-row"> Mã: {value.khoId}</div>
              <div className="kho-pickem-row"> Tên: {value.name}</div>
            </div>
          );
        })}
    </div>
  );
});

export default Inner;
