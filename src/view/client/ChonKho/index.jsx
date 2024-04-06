import { memo, useCallback, useEffect, useState } from "react";
import Inner from "./Inner";
import { getKho } from "reducers/kho/function";
import khoService from "services/khoService";
import userService from "services/userService";

const Wrapper = memo(() => {
  const [khoData, setKhoData] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [uid, setUid] = useState("");

  const getUser = useCallback(async () => {
    const res = await userService.me();
    setUid(res.data?.id);
  }, []);

  const handleRerender = useCallback(() => {
    setRerender(!rerender);
  }, [rerender]);

  const getKhoDetail = useCallback(() => {
    const khoParams = getKho();
    Promise.all(
      khoParams.map(async (value) => {
        const res = await khoService.detail(value);
        return res.data;
      })
    )
      .then((updatedData) => setKhoData(updatedData))
      .catch((error) => console.error(error));
  }, [setKhoData]);

  useEffect(() => {
    getUser();
    getKhoDetail();
  }, [getUser, getKhoDetail, rerender]);

  return <Inner data={khoData} handleRerender={handleRerender} uid={uid} />;
});
Wrapper.displayName = "ChonKho";

const ChonKho = Wrapper;

export default ChonKho;
