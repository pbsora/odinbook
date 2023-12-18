import {} from "react";
import { useLoaderData } from "react-router-dom";
import Header from "./Components/Global/Header";
import defaultUser from "../assets/images/default_user.png";

type AuthData = {
  data: [boolean, object];
};

const Home = () => {
  const auth = useLoaderData() as AuthData;
  console.log(auth);

  return (
    <>
      <Header />
      <img src={defaultUser} alt="default user" />
    </>
  );
};

export default Home;
