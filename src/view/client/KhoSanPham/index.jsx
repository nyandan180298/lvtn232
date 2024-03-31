import { memo, useCallback, useEffect, useState } from "react";
import Inner from "./Inner";
import productService from "services/productService";
import { useSearchParams } from "react-router-dom";

const NGUON_NHAP_URL = "http://localhost:3001/nguon-nhap";

const Wrapper = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
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

    if (res.isSuccess) {
      Promise.all(
        res.data.data.map(async (value) => {
          if (value.nguonNhap) {
            const nn = await fetch(`${NGUON_NHAP_URL}/get/${value.nguonNhap}`);
            const resNn = await nn.json();
            return { ...value, nguonNhap: resNn.data.name };
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
    getAll({});
  }, [getAll]);

  return (
    data && <Inner data={data} onPaginate={onPaginate} pageObj={pageObj} />
  );
});
Wrapper.displayName = "KhoSanPham";

const KhoSanPham = Wrapper;

export default KhoSanPham;
