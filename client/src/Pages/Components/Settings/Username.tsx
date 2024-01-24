import { UserType } from "@/assets/Types & Interfaces";
import { useState } from "react";

type Props = {
  user: UserType;
};
const Username = ({ user }: Props) => {
  const [username, setUsername] = useState(user.username);

  return (
    <form action="" className="flex flex-col gap-3">
      <label htmlFor="username" className="block text-xl">
        Username
      </label>
      <input
        type="text"
        className="w-2/4 px-3 py-2 border border-white rounded-xl dark:bg-zinc-700"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <span className="block text-red-500 ">
        *Username can only be changed once
      </span>
      <button className="block w-1/4 py-3 border border-white dark:bg-zinc-600 rounded-xl">
        Change Username
      </button>
    </form>
  );
};
export default Username;
