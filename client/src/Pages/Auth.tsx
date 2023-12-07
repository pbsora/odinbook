import { useState } from "react";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import { useAutoAnimate } from "@formkit/auto-animate/react";
// import { useLoaderData } from "react-router-dom";

// type AuthData = {
//   data: [boolean, object];
// };

const Auth = () => {
  const [auth, setAuth] = useState("login");

  const [parent] = useAutoAnimate();

  // const auth = useLoaderData() as AuthData;
  // console.log(auth.data);

  const handleTab = () => {
    setAuth((prev) => (prev === "login" ? "register" : "login"));
  };

  return (
    <div className="flex w-screen h-screen ">
      <div className="hidden w-2/4 bg-cyan-400 xl:block"></div>
      <div
        className="flex flex-col items-center justify-center w-full h-full gap-6 xl:w-2/4"
        ref={parent}
      >
        <div className="flex gap-6 ">
          <button
            className={`border-b-2 ${
              auth == "login" ? "border-sky-400" : "border-black"
            }`}
            onClick={handleTab}
          >
            Login
          </button>
          <button
            className={`border-b-2 ${
              auth == "register" ? "border-sky-400" : "border-black"
            }`}
            onClick={handleTab}
          >
            Register
          </button>
        </div>
        {auth === "login" ? <Login /> : <Register setAuth={setAuth} />}
      </div>
    </div>
  );
};

export default Auth;
