import { AuthData } from "@/assets/Types & Interfaces";
import { UserContext } from "@/lib/Context/UserContext";
import { useContext } from "react";
import ProfilePicture from "./Components/Settings/ProfilePicture";
import ProfileDescription from "./Components/Settings/ProfileDescription";
import Username from "./Components/Settings/Username";

const Settings = () => {
  const [, user] = useContext(UserContext) as AuthData;

  return (
    <div className="w-full md:w-[50vw] lg:w-[55vw] 2xl:max-w-[55vw] border-2 mb-20 rounded-xl px-12 flex flex-col gap-12 shadow-xl bg-zinc-50 dark:bg-darkSecondary mt-6 border-zinc-400 p-6">
      <ProfilePicture user={user} />
      <hr className="border-b dark:border-white border-zinc-400" />
      <ProfileDescription user={user} />
      <hr className="border-b dark:border-white border-zinc-400" />
      <Username user={user} />
    </div>
  );
};
export default Settings;
