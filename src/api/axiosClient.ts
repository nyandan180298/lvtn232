import axios from "axios";
import { APP_URL } from "utils/constants";
import { getAccessToken } from "utils/localStorage";
const axiosClient = axios.create({
  baseURL: `${APP_URL}/#home`,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
axiosClient.interceptors.request.use((request) => {
  const accessToken = getAccessToken();
  const accessHeader = `Bearer ${accessToken}`;
  if (request.headers) {
    request.headers["Authorization"] = accessHeader;
  }
  return request;
});
export default axiosClient;
