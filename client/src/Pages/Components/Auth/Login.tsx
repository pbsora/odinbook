import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { RotatingLines } from "react-loader-spinner";
import { useLogin } from "@/lib/Queries/userQueries";
import { AxiosError } from "axios";

const Login = () => {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const loginMutation = useLogin(login.username, login.password);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (loginMutation.isSuccess) {
      navigate("/");
    } else if (loginMutation.isError) {
      const res = loginMutation.failureReason as AxiosError;
      const error = res.response?.data as { error: string };
      console.log(error);
      error && setErrors(error.error);
      loginMutation.reset();
    }
  }, [
    loginMutation.isSuccess,
    loginMutation.isError,
    loginMutation.failureReason,
    navigate,
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!login.username.trim() || !login.password.trim()) return;
    loginMutation.mutate();

    setTimeout(() => {
      setErrors(
        "Waking up Backend services. Please wait a moment and try again!"
      );
    }, 5000);
  };

  const handleGoogle = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <div className="w-[90%] p-10 border-2 border-zinc-800 md:w-2/4 rounded-md h-fit shadow-2xl">
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
            className="dark:text-white login-input dark:bg-zinc-800"
            onChange={handleChange}
            value={login.username}
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
            className="dark:text-white login-input dark:bg-zinc-800"
            onChange={handleChange}
            value={login.password}
            placeholder="Password"
            required
          />
        </div>
        <span
          className={`italic text-lg text-center text-red-600 opacity-0 ${"opacity-100"}`}
        >
          {errors !== "" && errors}
        </span>

        <button
          type="submit"
          className={`flex items-center justify-center  w-3/4 px-6 py-2 border-2 border-black dark:border-zinc-800 rounded-lg dark:hover:bg-zinc-800 hover:bg-zinc-200
          ${loginMutation.isPending && "cursor-not-allowed"}`}
          disabled={loginMutation.isPending}
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
