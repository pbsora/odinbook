import Login from "./Components/Auth/Login";
import { useLoaderData } from "react-router-dom";

type AuthData = {
  data: [boolean, object];
};

const Auth = () => {
  const auth = useLoaderData() as AuthData;
  console.log(auth.data);

  return (
    <div className="flex w-screen h-screen">
      <div className="hidden w-2/4 bg-cyan-400 lg:block"></div>
      <div className="flex items-center justify-center w-full h-full border border-red-500 lg:w-2/4">
        <Login />
      </div>
    </div>
  );
};

export default Auth;
