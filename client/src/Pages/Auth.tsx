import { useEffect, useState } from "react";
import Login from "./Components/Auth/Login";
import MultiRegister from "./Components/Auth/MultiRegister";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { API } from "@/utils/api";
import { useNavigate } from "react-router-dom";
import momiji from "../assets/momiji.png";

const Auth = () => {
  const [auth, setAuth] = useState("login");
  const [parent] = useAutoAnimate();

  const navigate = useNavigate();

  useEffect(() => {
    const getAuth = async () => {
      const { data } = await API.get("/auth/auth");
      if (data[0]) return navigate("/");
    };
    getAuth();
  }, [navigate]);

  const handleTab = () => {
    setAuth((prev) => (prev === "login" ? "register" : "login"));
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-screen h-screen gap-10 font-inter"
      ref={parent}
    >
      <div className="flex items-center justify-center">
        <img
          src={momiji}
          alt="momiji logo"
          className="w-[10rem] rotate-[60deg]"
        />
        <h1 className="text-6xl font-acme text-zinc-800 dark:text-white">
          Momiji
        </h1>
      </div>
      <div className="flex justify-center w-1/4 gap-6 r">
        <button
          className={`border-b-2 ${
            auth == "login" ? "border-sky-400" : "border-zinc-400"
          }`}
          onClick={handleTab}
        >
          Login
        </button>
        <button
          className={`border-b-2 ${
            auth == "register" ? "border-sky-400" : "border-zinc-400"
          }`}
          onClick={handleTab}
        >
          Register
        </button>
      </div>
      {auth === "login" ? <Login /> : <MultiRegister setAuth={setAuth} />}
    </div>
  );
};

export default Auth;
