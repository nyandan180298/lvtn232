import orderService from "services/orderService";

export const deleteOrderService = async (id: string) => {
  const res = await orderService.remove(id);
  return res;
};

export const completeOrderService = async (data: any) => {
  const res = await orderService.complete(data);
  return res;
};

export const confirmOrderService = async (data: any) => {
  const res = await orderService.confirm(data);
  return res;
};

export const cancelOrderService = async (data: any) => {
  const res = await orderService.cancel(data);
  return res;
};
