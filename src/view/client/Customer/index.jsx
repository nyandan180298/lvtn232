import { memo, useCallback, useEffect, useState } from "react";
import Inner from "./Inner";
import { useParams, useSearchParams } from "react-router-dom";
import customerService from "services/customerService";

const Wrapper = memo(() => {
  const { id } = useParams();
  const [rerender, setRerender] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [customers, setCustomers] = useState([]);

  const [pageObj, setPageObj] = useState({
    page: 0,
    total: 0,
    totalPage: 0,
  });

  const handleRerender = useCallback(() => {
    setRerender(!rerender);
  }, [rerender]);

  const getCustomer = useCallback(async (body, options) => {
    const param = { params: options };
    const res = await customerService.getAll(body, param);
    if (!res.data) {
      setCustomers([]);
    } else {
      setCustomers(res.data.data);
      setPageObj({
        page: res.data.page,
        total: res.data.total,
        totalPage: res.data.totalPage,
      });
    }
  }, []);

  useEffect(() => {
    const object = Object.fromEntries(searchParams.entries());
    getCustomer({ khoid: id }, object);
  }, [getCustomer, rerender, id, searchParams]);

  const onPaginate = useCallback(
    (page) => {
      searchParams.set("page", page);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  return (
    <Inner
      handleRerender={handleRerender}
      data={customers}
      khoId={id}
      onPaginate={onPaginate}
      pageObj={pageObj}
    />
  );
});
Wrapper.displayName = "Customer";

const Customer = Wrapper;

export default Customer;
