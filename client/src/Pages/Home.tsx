import { useState, useEffect } from "react";
import { useLoaderData, Outlet } from "react-router-dom";
import Header from "./Components/Header/Header";

import { UserContext } from "../lib/Context/UserContext";
import { AuthData } from "../assets/Types & Interfaces";
import Sidebar from "./Components/Global/Sidebar";

const Home = () => {
  const auth = useLoaderData() as AuthData;
  const [user, setUser] = useState<AuthData>(auth);
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    setUser(auth);
  }, [auth]);

  return (
    <>
      <UserContext.Provider value={user}>
        <main className="overflow-x-hidden lg:overflow-x-visible">
          <Header sidebar={sidebar} setSidebar={setSidebar} />
          <div className="relative flex w-full gap-5 m-auto mt-12 border border-green-500 lg:w-3/4 ">
            <Sidebar sidebar={sidebar} />
            <Outlet />
          </div>
        </main>
      </UserContext.Provider>
    </>
  );
};

export default Home;
