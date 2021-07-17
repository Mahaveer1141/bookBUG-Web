import Cookies from "universal-cookie";

const cookie = new Cookies();

export const getAccessToken = () => {
  return cookie.get("accessToken") || "";
};

export const setAccessToken = (token: string) => {
  cookie.set("accessToken", token);
};

export const getRefreshToken = () => {
  return cookie.get("refreshToken") || "";
};

export const setRefreshToken = (token: string) => {
  cookie.set("refreshToken", token);
};

export const clearCookies = () => {
  cookie.remove("refreshToken", { path: "/" });
  cookie.remove("accessToken", { path: "/" });
};
