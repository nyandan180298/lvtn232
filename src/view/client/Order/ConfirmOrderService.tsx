import orderService from "services/orderService";

export const deleteOrderService = async (id: string) => {
  const res = await orderService.remove(id);
  return res;
};
