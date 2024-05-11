import { memo, useCallback, useEffect, useState } from "react";
import Inner from "./Inner";
import notiService from "services/notiService";
import { useParams, useSearchParams } from "react-router-dom";
import Message from "components/Message";
import {
  readAllNotificationService,
  readNotificationService,
} from "./NotiService";

const Wrapper = memo(() => {
  const { id } = useParams();
  const [rerender, setRerender] = useState(false);
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

  const handleReadOneNoti = useCallback(
    (body) => {
      readNotificationService(body).then((res) => {
        if (res.isSuccess) {
          setRerender(!rerender);
          Message.sendSuccess(`Thành công`);
        } else Message.sendError(`Thất bại: ${res.message}`);
      });
    },
    [rerender]
  );

  const handleReadAllNoti = useCallback(() => {
    readAllNotificationService({ khoid: id }).then((res) => {
      if (res.isSuccess) {
        setRerender(!rerender);
        Message.sendSuccess(`Thành công`);
      } else Message.sendError(`Thất bại: ${res.message}`);
    });
  }, [rerender, id]);

  const handleRerender = useCallback(() => {
    setRerender(!rerender);
  }, [rerender]);

  const getNoti = useCallback(async (body, options) => {
    const param = { params: options };
    const res = await notiService.getAll(body, param);
    if (!res.data) {
      setData();
      setPageObj({
        page: 0,
        total: 0,
        totalPage: 0,
      });
    } else {
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
    getNoti({ khoid: id }, object);
  }, [getNoti, rerender, id, searchParams]);

  return (
    <Inner
      data={data}
      handleRerender={handleRerender}
      pageObj={pageObj}
      onPaginate={onPaginate}
      handleReadOneNoti={handleReadOneNoti}
      handleReadAllNoti={handleReadAllNoti}
    />
  );
});
Wrapper.displayName = "Noti";

const Noti = Wrapper;

export default Noti;
