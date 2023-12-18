import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { API } from "../../../utils/api";
import { useMutation } from "@tanstack/react-query";
import { ErrorResponse } from "../../../assets/Types & Interfaces";
import { RotatingLines } from "react-loader-spinner";

const Login = () => {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async () => {
      return await API.post("/auth/log-in", {
        username: login.username,
        password: login.password,
      });
    },
    onSettled: (_data, error: ErrorResponse | null) => {
      if (error) return setErrors(error.response.data.error);
      navigate("/");
    },
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!login.username.trim() || !login.password.trim()) return;
    loginMutation.mutate();
  };

  const handleGoogle = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <div className="w-[90%] p-10 border-2 border-black md:w-2/4 rounded-xl h-fit ">
      <form
        action=""
        className="flex flex-col items-center w-full gap-4 m-auto "
        onSubmit={handleLogin}
      >
        <div className="w-3/4">
          <label htmlFor="username" className="label">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="login-input"
            onChange={handleChange}
            minLength={3}
            placeholder="Username"
            required
          />
        </div>
        <div className="w-3/4">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="login-input"
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <span className={`italic text-red-600 opacity-0 ${"opacity-100"}`}>
          {errors !== "" && errors}
        </span>

        <button
          type="submit"
          className="flex items-center justify-center w-3/4 px-6 py-2 border-2 border-black rounded-lg hover:bg-zinc-200"
        >
          {loginMutation.isPending ? (
            <RotatingLines width="24" strokeColor="blue" />
          ) : (
            "Log-in"
          )}
        </button>
        <button onClick={handleGoogle} className="mt-3">
          <GoogleButton />
        </button>
      </form>
    </div>
  );
};
export default Login;
