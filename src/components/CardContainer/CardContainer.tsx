import React, { FC, memo, useCallback } from "react";
import dayjs from "dayjs";

interface ICardContainerProps {
  data: {
    name: string;
    category: string;
    price: number;
    quantity: number;
    hanSd: string;
  }[];
  addOrderFormat: (_: any, text: any) => React.ReactNode;
}

const CardContainer: FC<ICardContainerProps> = memo(
  ({ data, addOrderFormat }) => {
    const formatHanSd = useCallback((text: string) => {
      const expireDate = -Math.ceil(dayjs().diff(text) / (1000 * 60 * 60 * 24));

      return expireDate <= 0 ? (
        <div className="cards-value font_italic red bold">
          {text && dayjs(text).format("DD/MM/YYYY")}
        </div>
      ) : (
        <div className="cards-value font_italic">
          {text && dayjs(text).format("DD/MM/YYYY")}
        </div>
      );
    }, []);
    return (
      <div className="cards-container">
        {data &&
          data.map((v, i) => {
            return (
              <div className="cards-grow" key={i}>
                <div className="cards">
                  <div className="cards-logo">
                    <img
                      src={"default-product-image.png"}
                      alt="Web Logo"
                      height={140}
                    ></img>
                  </div>
                  <div className="cards-property">{v.name}</div>
                  <div className="cards-value">{v.category}</div>
                  <div className="cards-row">
                    <div
                      className={
                        `cards-property font_italic` +
                        (v.quantity === 0 ? " red" : "")
                      }
                    >
                      <span className="bold">Còn lại:</span> {v.quantity}
                    </div>
                    <div className="cards-value font_italic">
                      <span className="bold">Giá: </span>
                      {v.price}
                    </div>
                  </div>
                  <div className="cards-value">{addOrderFormat("", v)}</div>
                  <div className="cards-row">
                    <div className="cards-property">Hạn sử dụng:</div>
                    {formatHanSd(v.hanSd)}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
);

export default CardContainer;
