import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import GoogleButton from "react-google-button";

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
        url: "/auth/log-in",
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
          className="flex items-center justify-center w-3/4 px-6 py-2 border-2 border-black rounded-lg hover:bg-zinc-200"
        >
          {loading ? <RotatingLines width="24" strokeColor="blue" /> : "Log-in"}
        </button>
        <button onClick={handleGoogle} className="mt-3">
          <GoogleButton />
        </button>
      </form>
    </div>
  );
};
export default Login;
