import { memo, useCallback, useEffect, useState } from "react";
import Inner from "./Inner";
import productService from "services/productService";
import { useParams, useSearchParams } from "react-router-dom";
import { DEFAULT_URL } from "utils/constants";

const NGUON_NHAP_URL = `${DEFAULT_URL}/nguon-nhap`;
const _DANH_MUC_URL = `${DEFAULT_URL}/category`;

const Wrapper = memo(() => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [rerender, setRerender] = useState(false);

  const handleRerender = useCallback(() => {
    setRerender(!rerender);
  }, [rerender]);

  const [data, setData] = useState([]);

  const [pageObj, setPageObj] = useState({
    page: 0,
    total: 0,
    totalPage: 0,
  });

  const onPaginate = useCallback(
    (page) => {
      searchParams.set("page", page);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  const getAll = useCallback(async (body, options) => {
    const param = { params: options };
    const res = await productService.getAll(body, param);
    if (!res.data) setData([]);

    if (res.isSuccess) {
      Promise.all(
        res.data.data.map(async (value) => {
          if (value.nguonNhap && value.category) {
            const nn = await fetch(`${NGUON_NHAP_URL}/get/${value.nguonNhap}`);
            const resNn = await nn.json();
            const danhmuc = await fetch(
              `${_DANH_MUC_URL}/get/${value.category}`
            );
            const resDanhmuc = await danhmuc.json();
            return {
              ...value,
              nguonNhap: resNn.data.name,
              category: resDanhmuc.data.name,
            };
          }
          if (value.category) {
            const danhmuc = await fetch(
              `${_DANH_MUC_URL}/get/${value.category}`
            );
            const resDanhmuc = await danhmuc.json();
            return {
              ...value,
              category: resDanhmuc.data.name,
            };
          }
          return value;
        })
      )
        .then((updatedData) => setData(updatedData))
        .catch((error) => console.error(error));
    } else return;
    setPageObj({
      page: res.data.page,
      total: res.data.total,
      totalPage: res.data.totalPage,
    });
  }, []);

  useEffect(() => {
    const object = Object.fromEntries(searchParams.entries());
    getAll({ khoid: id }, object);
  }, [getAll, searchParams, id, rerender]);

  return (
    data && (
      <Inner
        data={data}
        onPaginate={onPaginate}
        pageObj={pageObj}
        handleRerender={handleRerender}
        khoId={id}
      />
    )
  );
});
Wrapper.displayName = "KhoSanPham";

const KhoSanPham = Wrapper;

export default KhoSanPham;
