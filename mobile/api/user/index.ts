import { IGetUserResponse } from "./models";
import { client } from "../config";

function initUserAPI() {
  async function get() {
    const response = await client.get<IGetUserResponse>("api/v1/user/");

    return response.data;
  }

  return { get };
}

export const user = initUserAPI();
