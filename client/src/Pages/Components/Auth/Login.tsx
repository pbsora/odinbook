import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { useLogin } from "@/lib/Queries/userQueries";
import { AxiosError } from "axios";
import { FcGoogle } from "react-icons/fc";

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
    <div className="p-10 border-2 border-zinc-400 w-[95%]  md:w-[60%] lg:w-[50%] xl:w-[30%] rounded-md h-fit shadow-2xl">
      <form
        action=""
        className="flex flex-col items-center w-full gap-4 m-auto "
        onSubmit={handleLogin}
      >
        <div className="w-[85%]">
          <label htmlFor="username" className="label">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="border-b-2 dark:text-white login-input dark:bg-zinc-800 dark:border-white"
            onChange={handleChange}
            value={login.username}
            minLength={3}
            placeholder="Username"
            required
          />
        </div>
        <div className="w-[85%]">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="border-b-2 dark:border-white dark:text-white login-input dark:bg-zinc-800"
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
          className={`flex items-center duration-200 text-lg justify-center w-3/4 px-6 py-2 border-2 border-zinc-600 dark:border-zinc-800 rounded-lg dark:hover:bg-zinc-800 hover:bg-neutral-200
          ${loginMutation.isPending && "cursor-not-allowed"}`}
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? (
            <RotatingLines width="24" strokeColor="blue" />
          ) : (
            "Log-in"
          )}
        </button>
        <button
          onClick={handleGoogle}
          className="p-3 mt-3 text-4xl duration-200 bg-white border-2 rounded-full shadow-lg border-zinc-300 dark:bg-darkSecondary hover:scale-110"
        >
          <FcGoogle />
        </button>
      </form>
    </div>
  );
};
export default Login;
