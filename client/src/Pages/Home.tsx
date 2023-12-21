import { useState, useEffect } from "react";
import { useLoaderData, Outlet } from "react-router-dom";
import Header from "./Components/Header/Header";

import { UserContext } from "../lib/Context/UserContext";
import { AuthData } from "../assets/Types & Interfaces";
import Sidebar from "./Components/Global/Sidebar";

const Home = () => {
  const auth = useLoaderData() as AuthData;
  const [user, setUser] = useState<AuthData>(auth);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setUser(auth);
  }, [auth]);

  return (
    <>
      <UserContext.Provider value={user}>
        <main
          className={`${
            open && "overflow-y-hidden"
          } overflow-x-hidden lg:overflow-visible font-inter`}
        >
          <Header open={open} setOpen={setOpen} />
          <div className="relative flex w-full gap-5 m-auto  lg:mt-12 lg:w-[90vw] 2xl:w-3/4 ">
            <Sidebar open={open} setOpen={setOpen} />
            <Outlet />
          </div>
        </main>
      </UserContext.Provider>
    </>
  );
};

export default Home;
