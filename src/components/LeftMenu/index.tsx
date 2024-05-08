import { Menu } from "antd";
import { FC, memo, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getKho } from "reducers/kho/function";
import khoService from "services/khoService";

interface ILeftMenuProps {}

const LeftMenu: FC<ILeftMenuProps> = memo(() => {
  const loc = useLocation().pathname;
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const getKhoDetail = useCallback(() => {
    const khoParams = getKho();
    Promise.all(
      khoParams.map(async (value: any) => {
        const res = await khoService.detail(value);
        return res.data;
      })
    )
      .then((updatedData: any) => setData(updatedData))
      .catch((error) => console.error(error));
  }, [setData]);

  useEffect(() => {
    getKhoDetail();
  }, [getKhoDetail]);

  const MenuRows = [
    {
      key: "kho",
      label: "Kho sản phẩm",
      children:
        data &&
        data.map((value: any) => {
          return {
            key: "sub-kho_" + value.id,
            label: value.name,
            children: [
              {
                key: "san-pham_" + value.id,
                label: value.id ? (
                  <div
                    onClick={() => navigate(`/kho/${value.id}/san-pham`)}
                    rel="nofollow "
                  >
                    Quản lý sản phẩm
                  </div>
                ) : (
                  "Quản lý sản phẩm"
                ),
              },
              {
                key: "nguon-nhap_" + value.id,
                label: value.id ? (
                  <div
                    onClick={() => navigate(`/kho/${value.id}/nguon-nhap`)}
                    rel="nofollow "
                  >
                    Quản lý nguồn nhập
                  </div>
                ) : (
                  "Quản lý nguồn nhập"
                ),
              },
              {
                key: "don-hang_" + value.id,
                label: value.id ? (
                  <div
                    onClick={() => navigate(`/kho/${value.id}/don-hang`)}
                    rel="nofollow "
                  >
                    Quản lý đơn hàng
                  </div>
                ) : (
                  "Quản lý đơn hàng"
                ),
              },
              {
                key: "khach-hang_" + value.id,
                label: value.id ? (
                  <div
                    onClick={() => navigate(`/kho/${value.id}/khach-hang`)}
                    rel="nofollow "
                  >
                    Quản lý khách hàng
                  </div>
                ) : (
                  "Quản lý khách hàng"
                ),
              },
              // {
              //   key: "thong-bao_" + value.id,
              //   label: value.id ? (
              //     <div
              //       onClick={() => navigate(`/kho/${value.id}/thong-bao`)}
              //       rel="nofollow "
              //     >
              //       Thông báo
              //     </div>
              //   ) : (
              //     "Thông báo"
              //   ),
              // },
            ],
          };
        }),
    },
  ];

  return (
    <Menu
      items={MenuRows}
      defaultSelectedKeys={[
        "kho",
        "sub-kho_" + loc.split("/")[2],
        loc.split("/")[3] + "_" + loc.split("/")[2],
      ]}
      defaultOpenKeys={[
        "kho",
        "sub-kho_" + loc.split("/")[2],
        loc.split("/")[3] + "_" + loc.split("/")[2],
      ]}
      mode="inline"
      forceSubMenuRender={true}
    />
  );
});

export default LeftMenu;
