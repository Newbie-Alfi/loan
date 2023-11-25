import axios from "axios";
import axiosRetry from "axios-retry";
import { tokenStorage } from "./auth/tokenStorage";
import { auth } from "./auth";
import { BACKEND_URL } from "./constants";

// TODO: rename
export const client = axios.create({ baseURL: BACKEND_URL });

client.interceptors.request.use((conf) => {
  if (conf.headers) {
    const access = tokenStorage.getAccess();
    const Authorization = access ? `Bearer ${access}` : undefined;

    conf.headers.Authorization = Authorization;
  }

  return conf;
});

axiosRetry(client, {
  retries: 2,
  retryCondition: (error) => error.response?.status === 401,
  onRetry: auth.refresh,
});
