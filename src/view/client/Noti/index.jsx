import { memo, useCallback, useEffect, useState } from "react";
import Inner from "./Inner";

const Wrapper = memo(() => {
  const [rerender, setRerender] = useState(false);

  const handleRerender = useCallback(() => {
    setRerender(!rerender);
  }, [rerender]);

  const getNotiDetail = useCallback(() => {

  }, []);

  useEffect(() => {
    getNotiDetail();
  }, [getNotiDetail, rerender]);

  return <Inner data={[]} handleRerender={handleRerender}/>;
});
Wrapper.displayName = "Noti";

const Noti = Wrapper;

export default Noti;
