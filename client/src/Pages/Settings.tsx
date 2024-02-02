import { AuthData } from "@/assets/Types & Interfaces";
import { UserContext } from "@/lib/Context/UserContext";
import { useContext } from "react";
import ProfilePicture from "./Components/Settings/ProfilePicture";
import ProfileDescription from "./Components/Settings/ProfileDescription";
import Username from "./Components/Settings/Username";
import Password from "./Components/Settings/Password";
import Name from "./Components/Settings/Name";

const Settings = () => {
  const [, user] = useContext(UserContext) as AuthData;

  return (
    <div className="w-full md:w-[70vw] lg:mb-10 2xl:max-w-[55vw] border pb-10 md:rounded-xl px-12 flex flex-col gap-12 shadow-xl bg-zinc-50 dark:bg-darkSecondary md:mt-6 border-zinc-700 p-6">
      <ProfilePicture user={user} />
      <hr className="border-b dark:border-white border-zinc-400" />
      <ProfileDescription user={user} />
      <hr className="border-b dark:border-white border-zinc-400" />
      <Username user={user} />
      <hr className="border-b dark:border-white border-zinc-400" />
      <Password user={user} />
      <hr className="border-b dark:border-white border-zinc-400" />
      <Name user={user} />
    </div>
  );
};
export default Settings;
