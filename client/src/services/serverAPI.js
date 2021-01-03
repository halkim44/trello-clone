import axios from "axios";

const serverUrl =
  process.env.NODE_ENV === "production"
    ? "https://immense-wave-33493.herokuapp.com"
    : "http://localhost:3000";

export const serverAPI = axios.create({
  baseURL: `${serverUrl}/api`,
});
