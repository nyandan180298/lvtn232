import { memo, useCallback, useEffect, useState } from "react";
import Inner from "./Inner";
import orderService from "services/orderService";
import { useParams, useSearchParams } from "react-router-dom";
import customerService from "services/customerService";
import productService from "services/productService";

const Wrapper = memo(() => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [rerender, setRerender] = useState(false);
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

  const handleRerender = useCallback(() => {
    setRerender(!rerender);
  }, [rerender]);

  const getOrder = useCallback(async (body, options) => {
    const param = { params: options };
    const res = await orderService.getAll(body, param);
    if (!res.data) setData([]);

    if (res.isSuccess) {
      Promise.all(
        res.data.data.map(async (value) => {
          const cus = await customerService.detail(value.customer);
          const products = await Promise.all(
            value.detail.map(async (value) => {
              const prod = await productService.detail(value.product);
              return {
                ...value,
                product_name: prod.data.name,
                hsd: prod.data.hanSd,
              };
            })
          );

          return {
            ...value,
            products: products,
            customer: cus.data.name,
            phoneNum: cus.data.phoneNum,
          };
        })
      )
        .then((updatedData) => setData(updatedData))
        .catch((error) => console.error(error));
      setData(res.data.data);
      setPageObj({
        page: res.data.page,
        total: res.data.total,
        totalPage: res.data.totalPage,
      });
    }
  }, []);

  useEffect(() => {
    const object = Object.fromEntries(searchParams.entries());
    getOrder({ khoid: id }, object);
  }, [getOrder, rerender, id, searchParams]);

  return (
    <Inner
      data={data}
      onPaginate={onPaginate}
      pageObj={pageObj}
      handleRerender={handleRerender}
      khoId={id}
    />
  );
});
Wrapper.displayName = "Order";

const Order = Wrapper;

export default Order;
