import { UserType } from "@/assets/Types & Interfaces";
import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useChangeName } from "@/lib/Queries/userQueries";
import { useToast } from "../ui/use-toast";

type Props = { user: UserType };
const Name = ({ user }: Props) => {
  const [name, setName] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
  });
  const nameMutation = useChangeName(name.firstName, name.lastName, user._id);
  const { toast } = useToast();

  useEffect(() => {
    if (nameMutation.isSuccess) {
      toast({
        title: "Success",
        description: "Name changed successfully",
      });
      nameMutation.reset();
    } else if (nameMutation.isError) {
      toast({
        title: "Error",
        description: "Something went wrong, please try again",
      });
      nameMutation.reset();
    }
  }, [nameMutation, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.firstName.trim() || !name.lastName.trim()) {
      return toast({
        title: "Error",
        content: "Please enter a valid input",
      });
    }

    nameMutation.mutate();
  };

  return (
    <form action="" className="flex flex-col gap-6" onSubmit={handleChangeName}>
      <h2 className="text-xl">Change Name</h2>
      <div className="">
        <label htmlFor="confirmPassword" className="block mb-2">
          First name:
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-zinc-700 dark:border-white lg:w-2/4 rounded-xl dark:bg-zinc-700"
          name="firstName"
          value={name.firstName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block mb-2">
          Last name:
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-zinc-700 dark:border-white lg:w-2/4 rounded-xl dark:bg-zinc-700"
          name="lastName"
          value={name.lastName}
          onChange={handleChange}
        />
      </div>
      <button className="block w-2/4 py-3 text-white duration-200 lg:w-1/4 bg-sky-500 dark:bg-zinc-600 rounded-xl hover:dark:bg-zinc-700">
        {nameMutation.isPending ? (
          <RotatingLines width="30" strokeColor="blue" />
        ) : (
          "Change name"
        )}
      </button>
    </form>
  );
};
export default Name;
