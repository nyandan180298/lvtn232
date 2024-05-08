import orderService from "services/orderService";

export const addOrderService = async (data: any, khoid: string) => {
  const res = await orderService.create({
    ...data,
    kho: khoid,
  });
  return res;
};

