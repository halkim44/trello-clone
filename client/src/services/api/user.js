import { serverAPI } from "../serverAPI";

export const requestSignup = (userData) =>
  serverAPI.post("/user/register", userData);

export const requestLogin = (userData) =>
  serverAPI.post("/user/login", userData);
