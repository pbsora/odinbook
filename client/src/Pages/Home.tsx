import React from "react";

import { useLoaderData } from "react-router-dom";

type AuthData = {
  data: [boolean, object];
};

const Home = () => {
  const auth = useLoaderData() as AuthData;
  console.log(auth);
  return <div>Home</div>;
};

export default Home;
