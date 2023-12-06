import axios from "axios";
import { redirect } from "react-router-dom";

export const authLoader = async () => {
  const { data } = await axios({
    method: "get",
    url: "/user/auth",
    withCredentials: true,
  });
  if (data[0]) return redirect("/");
  return data;
};
