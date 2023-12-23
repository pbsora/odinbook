import { useContext } from "react";
import { UserContext } from "../lib/Context/UserContext";
import { AuthData } from "../assets/Types & Interfaces";
import Profile from "./Components/Profile/Profile";

const OwnProfile = () => {
  const [, user] = useContext(UserContext) as AuthData;
  console.log(user);
  return (
    <div className="border w-full 2xl:w-[55vw]">
      <Profile user={user} />
    </div>
  );
};
export default OwnProfile;
