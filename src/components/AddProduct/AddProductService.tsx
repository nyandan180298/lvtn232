import productService from "services/productService";

export const addProductService = async (data: any, khoid: string) => {
  const res = await productService.create({
    ...data,
    kho: khoid,
  });
  return res;
};

export const editProductService = async (data: any, pid: string) => {
  const res = await productService.update({
    ...data,
    pid: pid,
  });
  return res;
};

export const detailProductService = async (pid: string) => {
  const res = await productService.detail(pid);
  if (res.isSuccess) {
    return res.data;
  } else {
    return {};
  }
};
