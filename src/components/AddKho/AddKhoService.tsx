import khoService from "services/khoService";

export const addKhoService = async (data: any, uid: string) => {
  const res = await khoService.create({
    ...data,
    uid: uid,
  });
  return res;
};

export const editKhoService = async (data: any, uid: string) => {
  const res = await khoService.update({
    ...data,
    uid: uid,
  });
  return res;
};
