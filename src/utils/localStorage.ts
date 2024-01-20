const ACCESS_TOKEN: string = "access_token";

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);
export const setAccessToken = (value: string) => {
  localStorage.setItem(ACCESS_TOKEN, value);
};

export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
};
