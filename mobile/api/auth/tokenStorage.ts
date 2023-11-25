import AsyncStorage from "@react-native-async-storage/async-storage";

interface ITokenStorage {
  getRefresh(): Promise<string | null>;
  getAccess(): Promise<string | null>;
  setRefresh(v: string | undefined): Promise<void>;
  setAccess(v: string | undefined): Promise<void>;
}

const ACCESS_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";

function initTokenStorage(): ITokenStorage {
  async function getRefresh() {
    return await AsyncStorage.getItem(REFRESH_KEY);
  }

  async function getAccess() {
    return await AsyncStorage.getItem(ACCESS_KEY);
  }

  async function setAccess(value: string | undefined): Promise<void> {
    if (value) await AsyncStorage.setItem(ACCESS_KEY, value);
    else await AsyncStorage.removeItem(ACCESS_KEY);
  }

  async function setRefresh(value: string | undefined): Promise<void> {
    if (value) await AsyncStorage.setItem(REFRESH_KEY, value);
    else await AsyncStorage.removeItem(REFRESH_KEY);
  }

  return { getRefresh, getAccess, setAccess, setRefresh };
}

export const tokenStorage: ITokenStorage = initTokenStorage();
