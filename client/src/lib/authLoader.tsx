import { redirect } from "react-router-dom";
import { API } from "../utils/api";

export const authLoader = async () => {
  const { data } = await API.get("/auth/auth");
  if (data[0]) return redirect("/");
  return data;
};

export const loginLoader = async () => {
  const { data } = await API.get("/auth/auth");
  if (!data[0]) return redirect("/auth");
  return data;
};
