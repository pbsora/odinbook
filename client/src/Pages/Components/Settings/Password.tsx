import { UserType } from "@/assets/Types & Interfaces";
import { useState } from "react";

type Props = { user: UserType };
const Password = ({ user }: Props) => {
  const [confirmedPassword, setConfirmedPassword] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  return (
    <form className="flex flex-col gap-3">
      <label htmlFor="confirmPassword">
        Confirm your password to enable changes:
      </label>
      <input
        type="text"
        className="w-2/4 px-3 py-2 border border-white rounded-xl dark:bg-zinc-700"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        required
      />
      <button className="block w-1/4 py-3 duration-200 dark:bg-zinc-600 rounded-xl hover:dark:bg-zinc-700">
        Confirm password
      </button>
    </form>
  );
};
export default Password;
