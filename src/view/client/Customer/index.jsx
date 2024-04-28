import { memo, useCallback, useEffect, useState } from "react";
import Inner from "./Inner";
import khoService from "services/khoService";
import { DEFAULT_URL } from "utils/constants";
import { useParams } from "react-router-dom";

const _NN_URL = `${DEFAULT_URL}/nguon-nhap`;

const Wrapper = memo(() => {
  const [rerender, setRerender] = useState(false);
  const [nn, setNn] = useState([]);

  const { id } = useParams();

  const handleRerender = useCallback(() => {
    setRerender(!rerender);
  }, [rerender]);

  const getNn = useCallback(async () => {
    const kho = await khoService.detail(id);
    const nn = kho.data.nguonNhaps;
    const arr = await Promise.all(
      nn.map(async (value) => {
        const nguon_nhap = await fetch(`${_NN_URL}/get/${value}`);
        const resNguon_nhap = await nguon_nhap.json();
        return {
          _id: resNguon_nhap.data._id,
          name: resNguon_nhap.data.name,
          phone_num: resNguon_nhap.data.phone_num,
        };
      })
    );
    if (arr) setNn(arr);
  }, [id]);

  useEffect(() => {
    getNn();
  }, [getNn, rerender]);

  return <Inner handleRerender={handleRerender} data={nn} khoId={id}/>;
});
Wrapper.displayName = "Customer";

const Customer = Wrapper;

export default Customer;
