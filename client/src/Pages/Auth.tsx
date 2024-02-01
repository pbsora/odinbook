import { useEffect, useState } from "react";
import Login from "./Components/Auth/Login";
import MultiRegister from "./Components/Auth/MultiRegister";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { API } from "@/utils/api";
import { useNavigate } from "react-router-dom";

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
    <div className="flex w-screen h-screen ">
      <div
        className="flex flex-col items-center justify-center w-[60%] h-full gap-6 m-auto"
        ref={parent}
      >
        <div className="flex w-2/4 gap-6">
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
    </div>
  );
};

export default Auth;
