import axiosRetry from "axios-retry";
import axios from "axios";

import { AUTH_BACKEND_URL } from "../constants";
import { auth } from "../auth";
import { IGetUserResponse } from "./models";

function initUserAPI() {
  const client = axios.create({ baseURL: AUTH_BACKEND_URL });

  axiosRetry(client, {
    retries: 2,
    retryCondition: (error) => error.response?.status === 401,
    onRetry: auth.refresh,
  });

  async function get() {
    const response = await client.get<IGetUserResponse>("api/v1/user/");

    return response.data;
  }

  return { get };
}

export const user = initUserAPI();
