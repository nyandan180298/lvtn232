import { memo, useCallback, useEffect, useState } from "react";
import Inner from "./Inner";
import { getKho } from "reducers/kho/function";
import khoService from "services/khoService";

const Wrapper = memo(() => {
  const [khoData, setKhoData] = useState([]);

  const getKhoDetail = useCallback(() => {
    const khoParams = getKho();
    Promise.all(
      khoParams.map(async (value) => {
        const res = await khoService.detail(value);
        return res.data
        ;
      })
    )
      .then((updatedData) => setKhoData(updatedData))
      .catch((error) => console.error(error));
  }, [setKhoData]);

  useEffect(() => {
    getKhoDetail();
  }, [getKhoDetail]);

  return <Inner data={khoData} />;
});
Wrapper.displayName = "ChonKho";

const ChonKho = Wrapper;

export default ChonKho;
