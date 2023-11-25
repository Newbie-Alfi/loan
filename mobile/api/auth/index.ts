import axios from "axios";
import { ISignInResponse } from "./models";
import { BACKEND_URL } from "../constants";
import { tokenStorage } from "./tokenStorage";

interface ISignUpRequest {
  username: string;
  email: string;
  password: string;
  password2: string;
}

function initAuth() {
  const api = axios.create({
    baseURL: BACKEND_URL + "api/v1/",
  });

  async function singIn(username: string, password: string) {
    const data = new FormData();

    data.set("username", username);
    data.set("password", password);

    const response = await api.post<ISignInResponse>(`sign-in/`, data);

    await tokenStorage.setAccess(response.data.access);
    await tokenStorage.setRefresh(response.data.refresh);
  }

  async function singUp({
    username,
    email,
    password,
    password2,
  }: ISignUpRequest) {
    const data = new FormData();

    data.set("username", username);
    data.set("email", email);
    data.set("password", password);
    data.set("password2", password2);

    const response = await api.post<ISignInResponse>(`sign-up/`, data);

    await tokenStorage.setAccess(response.data.access);
    await tokenStorage.setRefresh(response.data.refresh);
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
