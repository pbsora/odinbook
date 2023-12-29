import { useState } from "react";
import { useLoaderData, Outlet, useOutletContext } from "react-router-dom";
import Header from "./Components/Header/Header";

import { UserContext } from "../lib/Context/UserContext";
import { AuthData, OutletContext } from "../assets/Types & Interfaces";
import Sidebar from "./Components/Global/Sidebar";
import { Toaster } from "./Components/ui/toaster";

const Home = () => {
  const auth = useLoaderData() as AuthData;
  const [user] = useState<AuthData>(auth);
  const [open, setOpen] = useState(false);

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
            <Outlet context={{ open } satisfies OutletContext} />
          </div>
          <Toaster />
        </main>
      </UserContext.Provider>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useTab() {
  return useOutletContext<OutletContext>();
}

export default Home;
