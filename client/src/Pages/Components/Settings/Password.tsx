import { UserType } from "@/assets/Types & Interfaces";
import React, { useEffect, useState } from "react";
import {
  useConfirmPassword,
  useChangePassword,
} from "@/lib/Queries/userQueries";
import { useToast } from "../ui/use-toast";
import { AxiosError } from "axios";
import { RotatingLines } from "react-loader-spinner";

type Props = { user: UserType };
const Password = ({ user }: Props) => {
  const [confirmedPassword, setConfirmedPassword] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const confirmMutation = useConfirmPassword(passwordConfirmation, user._id);

  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const passwordMutation = useChangePassword(
    password.password,
    password.confirmPassword,
    user._id
  );

  const { toast } = useToast();

  useEffect(() => {
    //Password confirmation
    if (confirmMutation.isSuccess) setConfirmedPassword(true);
    else if (confirmMutation.isError) {
      const error = confirmMutation.error as AxiosError;
      const responseData = error.response?.data as { error: string };
      const errorMessage = responseData.error;
      toast({
        title: "Error",
        description: `${errorMessage}`,
        className: "text-xl",
      });
      confirmMutation.reset();
    }

    //Password change
    if (passwordMutation.isSuccess) {
      toast({
        title: "Success",
        description: "Password changed successfully",
        className: "text-xl",
      });
      passwordMutation.reset();
    } else if (passwordMutation.isError) {
      const error = passwordMutation.error as AxiosError;
      const responseData = error.response?.data as { error: string };
      const errorMessage = responseData.error;
      toast({
        title: "Error",
        description: `${errorMessage}`,
        className: "text-xl",
      });
      passwordMutation.reset();
    }
  }, [confirmMutation, toast, passwordMutation]);

  const handleConfirmPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!passwordConfirmation.trim()) {
      return toast({
        title: "Error",
        description: "Don't leave the input blank",
        className: "text-xl",
      });
    }

    confirmMutation.mutate();
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.password !== password.confirmPassword) {
      return toast({
        title: "Error",
        description: "Passwords don't match",
        className: "text-xl",
      });
    }

    passwordMutation.mutate();
  };

  return (
    <>
      <h2 className="text-xl">Change password</h2>
      {confirmedPassword ? (
        <form
          action=""
          className="flex flex-col gap-6"
          onSubmit={handleChangePassword}
        >
          <div className="">
            <label htmlFor="confirmPassword" className="block mb-2">
              New password:
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-zinc-700 dark:border-white lg:w-2/4 rounded-xl dark:bg-zinc-700"
              value={password.password}
              onChange={handlePassword}
              name="password"
              placeholder="New Password"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block mb-2">
              Confirm your:
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-zinc-700 dark:border-white lg:w-2/4 rounded-xl dark:bg-zinc-700"
              value={password.confirmPassword}
              onChange={handlePassword}
              name="confirmPassword"
              placeholder="Confirm password"
            />
          </div>
          <button className="block w-2/4 py-3 text-white duration-200 lg:w-1/4 bg-sky-500 dark:bg-zinc-600 rounded-xl hover:dark:bg-zinc-700">
            {confirmMutation.isPending ? (
              <RotatingLines width="30" strokeColor="blue" />
            ) : (
              "Submit password"
            )}
          </button>
        </form>
      ) : (
        <form className="flex flex-col gap-3" onSubmit={handleConfirmPassword}>
          <label htmlFor="confirmPassword">
            Confirm your password to enable changes:
          </label>
          <input
            type="password"
            className="px-3 py-2 border dark:border-white lg:w-2/4 rounded-xl border-zinc-700 dark:bg-zinc-700"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="Confirm password"
          />
          <button className="block w-2/4 py-3 text-white duration-200 lg:w-1/4 dark:bg-zinc-600 bg-sky-500 rounded-xl hover:dark:bg-zinc-700">
            {confirmMutation.isPending ? (
              <RotatingLines width="30" strokeColor="blue" />
            ) : (
              "Confirm password"
            )}
          </button>
        </form>
      )}
    </>
  );
};
export default Password;
