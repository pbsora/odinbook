import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// type Props = {}
const Login = (/* props: Props */) => {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "post",
        url: "/user/log-in",
        withCredentials: true,
        data: {
          username: login.username,
          password: login.password,
        },
      });
      if (data.error) return console.log(data.error);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  //TODO: add errors on bad login
  return (
    <div className="p-10 border-2 border-black lg:w-2/4 rounded-xl h-2/4">
      <form
        action=""
        className="flex flex-col items-center w-3/4 gap-6 m-auto "
        onSubmit={handleLogin}
      >
        <div>
          <label htmlFor="username" className="block text-2xl">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="px-6 py-2 border-2 border-black rounded-xl"
            onChange={handleChange}
            minLength={3}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-2xl">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="px-6 py-2 border-2 border-black rounded-xl"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-3/4 px-6 py-2 border-2 border-black rounded-3xl hover:bg-zinc-200"
        >
          Log-in
        </button>
      </form>
    </div>
  );
};
export default Login;
