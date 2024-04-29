import { memo, useCallback, useEffect, useState } from "react";
import Inner from "./Inner";
import { useParams, useSearchParams } from "react-router-dom";
import nnService from "services/nnService";

const Wrapper = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rerender, setRerender] = useState(false);
  const [nn, setNn] = useState([]);
  const [pageObj, setPageObj] = useState({
    page: 0,
    total: 0,
    totalPage: 0,
  });

  const { id } = useParams();

  const onPaginate = useCallback(
    (page) => {
      searchParams.set("page", page);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  const handleRerender = useCallback(() => {
    setRerender(!rerender);
  }, [rerender]);

  const getNn = useCallback(async (body, options) => {
    const param = { params: options };
    const res = await nnService.getAll(body, param);
    if (!res.data) setNn([]);

    if (res.isSuccess) {
      setNn(res.data?.data);
      setPageObj({
        page: res.data.page,
        total: res.data.total,
        totalPage: res.data.totalPage,
      });
    } else return;
  }, []);

  useEffect(() => {
    const object = Object.fromEntries(searchParams.entries());
    getNn({ khoid: id }, object);
  }, [getNn, rerender, id, searchParams]);

  return (
    <Inner
      handleRerender={handleRerender}
      onPaginate={onPaginate}
      data={nn}
      khoId={id}
      pageObj={pageObj}
    />
  );
});
Wrapper.displayName = "NguonNhap";

const NguonNhap = Wrapper;

export default NguonNhap;
