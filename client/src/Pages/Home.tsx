import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Header from "./Components/Global/Header";

import { UserContext } from "../lib/Context/UserContext";
import { AuthData } from "../assets/Types & Interfaces";

const Home = () => {
  const auth = useLoaderData() as AuthData;
  const [user, setUser] = useState<AuthData>(auth);

  useEffect(() => {
    setUser(auth);
  }, [auth]);

  return (
    <>
      <UserContext.Provider value={user}>
        <main className="h-[1000vh] overflow-x-hidden">
          <Header />
        </main>
      </UserContext.Provider>
    </>
  );
};

export default Home;
