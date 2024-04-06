import khoService from "services/khoService";

export const deleteKhoService = async (id: string) => {
  const res = await khoService.remove(id);
  return res;
};
