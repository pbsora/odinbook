import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

// type Props = {}
const Login = (/* props: Props */) => {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { username, password } = login;
    if (username == "" || password == "") return setLoading(false);

    try {
      const { data } = await axios({
        method: "post",
        url: "/user/log-in",
        withCredentials: true,
        data: {
          username: username,
          password: password,
        },
      });
      if (data.error) {
        setLoading(false);
        return setErrors(data.error);
      }
      navigate("/");
    } catch (error) {
      console.log(error);
      setErrors("Server error, please refresh the page");
    }
  };

  return (
    <div className="w-[90%] p-10 border-2 border-black md:w-2/4 rounded-xl h-2/4 ">
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
            className="w-full px-6 py-2 border-2 border-black rounded-xl focus:outline-4 focus:outline-sky-400"
            onChange={handleChange}
            minLength={3}
          />
        </div>
        <div className="w-3/4">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="w-full px-6 py-2 border-2 border-black rounded-xl focus:outline-4 focus:outline-sky-400"
            onChange={handleChange}
          />
        </div>
        <span
          className={`italic text-red-600 opacity-0 ${
            errors !== "" && "opacity-100"
          }`}
        >
          {errors || "Nothing"}
        </span>
        <button
          type="submit"
          className="flex items-center justify-center w-3/4 px-6 py-2 border-2 border-black rounded-3xl hover:bg-zinc-200"
        >
          {loading ? <RotatingLines width="24" strokeColor="blue" /> : "Log-in"}
        </button>
      </form>
    </div>
  );
};
export default Login;
