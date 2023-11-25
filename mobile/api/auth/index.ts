import axios from "axios";
import { ISignInResponse } from "./models";
import { AUTH_BACKEND_URL } from "../constants";
import { tokenStorage } from "./tokenStorage";

interface ISignUpRequest {
  username: string;
  email: string;
  password: string;
  password2: string;
}

function initAuth() {
  const api = axios.create({
    baseURL: AUTH_BACKEND_URL + "api/v1/",
  });

  async function singIn(username: string, password: string) {
    const response = await api.post<ISignInResponse>(`sign-in/`, { username, password });

    await tokenStorage.setAccess(response.data.access);
    await tokenStorage.setRefresh(response.data.refresh);

    return response;
  }

  async function singUp(data: ISignUpRequest) {
    const response = await api.post<ISignInResponse>(`sign-up/`, data);
    return response;
  }

  async function refresh() {
    const refresh = await tokenStorage.getRefresh();

    if (!refresh) return;

    const data = new FormData();

    data.set("refresh", refresh);

    const response = await api.post<ISignInResponse>(`refresh/`, data);

    await tokenStorage.setAccess(response.data.access);
  }

  async function logout() {
    await tokenStorage.setAccess(undefined);
    await tokenStorage.setRefresh(undefined);
  }

  return { refresh, singIn, singUp, logout };
}

export const auth = initAuth();
