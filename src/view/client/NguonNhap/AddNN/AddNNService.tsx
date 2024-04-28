import nnService from "services/nnService";

export const addNNService = async (data: any, kho_id: string) => {
  const res = await nnService.create({
    ...data,
    kho_id: kho_id,
  });
  return res;
};

export const editNNService = async (data: any, id: string , kho_id: string) => {
  const res = await nnService.update({
    ...data,
    _id: id,
    kho_id: kho_id,
  });
  return res;
};

export const detailNNService = async (id: string) => {
  const res = await nnService.detail(id);
  if (res.isSuccess) {
    return res.data;
  } else {
    return {};
  }
};

export const deleteNNService = async (id: string) => {
  const res = await nnService.remove(id);
  return res;
};