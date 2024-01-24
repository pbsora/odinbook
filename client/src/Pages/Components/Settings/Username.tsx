import { UserType } from "@/assets/Types & Interfaces";
import React, { useEffect, useState } from "react";
import { useChangeUsername } from "@/lib/Queries/userQueries";
import { useToast } from "../ui/use-toast";
import { AxiosError } from "axios";

type Props = {
  user: UserType;
};
const Username = ({ user }: Props) => {
  const [username, setUsername] = useState(user.username);
  const usernameMutation = useChangeUsername(user._id, username);

  const { toast } = useToast();

  useEffect(() => {
    if (usernameMutation.isSuccess) {
      toast({
        title: "Success",
        description: "Username changed with success",
        className: "text-xl",
      });
      usernameMutation.reset();
    }
    if (usernameMutation.isError) {
      const error = usernameMutation.error as AxiosError;
      const responseData = error.response?.data as { error: string };
      const errorMessage = responseData.error;
      toast({
        title: "Error",
        description: `${errorMessage}`,
        className: "text-xl",
      });
      usernameMutation.reset();
    }
  }, [usernameMutation, toast]);

  const handleUsername = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username.trim()) {
      return toast({
        title: "Error",
        description: "Username cannot be blank",
        className: "text-xl",
      });
    }

    usernameMutation.mutate();
  };

  return (
    <form action="" className="flex flex-col gap-3" onSubmit={handleUsername}>
      <label htmlFor="username" className="block text-xl">
        Username
      </label>
      <input
        type="text"
        className="w-2/4 px-3 py-2 border border-white rounded-xl dark:bg-zinc-700"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <span className="block text-red-500 ">
        *Username can only be changed once
      </span>
      <button className="block w-1/4 py-3 duration-200 dark:bg-zinc-600 rounded-xl hover:dark:bg-zinc-700">
        Change Username
      </button>
    </form>
  );
};
export default Username;
