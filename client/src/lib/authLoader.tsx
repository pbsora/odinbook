import axios from "axios";
import { redirect } from "react-router-dom";

export const authLoader = async () => {
  const { data } = await axios({
    method: "get",
    url: "/auth/auth",
    withCredentials: true,
  });
  if (data[0]) return redirect("/");
  return data;
};

export const loginLoader = async () => {
  const { data } = await axios({
    method: "get",
    url: "/auth/auth",
    withCredentials: true,
  });
  if (!data[0]) return redirect("/auth");
  return data;
};
