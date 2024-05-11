import notiService from "services/notiService";

export const readNotificationService = async (data: any) => {
  const res = await notiService.read(data);
  return res;
};

export const readAllNotificationService = async (data: any) => {
  const res = await notiService.readAll(data);
  return res;
};

