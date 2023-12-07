import React, { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";

const matchPassword = (pass: string, secondPass: string) => {
  return pass === secondPass;
};

const isBlank = (obj: Form) => {
  return Object.values(obj).every((value) => {
    if (value === "") return true;
    return false;
  });
};

type Props = {
  setAuth: React.Dispatch<React.SetStateAction<string>>;
};

type Form = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const Register = ({ setAuth }: Props) => {
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (isBlank(form)) {
      setLoading(false);
      return setErrors("Please fill every input");
    }

    const { password, confirmPassword } = form;
    if (!matchPassword(password, confirmPassword)) {
      setLoading(false);
      return setErrors("Passwords don't match");
    }

    try {
      const { data } = await axios({
        method: "post",
        url: "user/register",
        withCredentials: true,
        data: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          username: form.username,
          password,
        },
      });
      console.log(data);
      if (data.error) {
        setLoading(false);
        return setErrors(data.error);
      }
      setAuth("login");
    } catch (error) {
      console.log(error);
      setErrors("Server error, please refresh the page");
    }
  };

  return (
    <div className="py-6 px-3 border-2 border-black w-[90%]  sm:w-3/4 rounded-xl text-xl">
      <form
        action=""
        className="flex flex-col items-center w-full gap-4 m-auto md:w-3/4 "
        onSubmit={handleRegister}
      >
        <div className="w-3/4">
          <label htmlFor="firstName" className="label ">
            First name
          </label>
          <input
            type="text"
            name="firstName"
            className="w-full px-6 py-2 border-2 border-black rounded-xl focus:outline-4 focus:outline-sky-400"
            onChange={handleChange}
          />
        </div>
        <div className="w-3/4">
          <label htmlFor="lastName" className="label">
            Last name
          </label>
          <input
            type="text"
            name="lastName"
            className="w-full px-6 py-2 border-2 border-black rounded-xl focus:outline-4 focus:outline-sky-400"
            onChange={handleChange}
          />
        </div>
        <div className="w-3/4">
          <label htmlFor="email" className="label">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-6 py-2 border-2 border-black rounded-xl focus:outline-4 focus:outline-sky-400"
            onChange={handleChange}
          />
        </div>
        <div className="w-3/4">
          <label htmlFor="username" className="label">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="w-full px-6 py-2 border-2 border-black rounded-xl focus:outline-4 focus:outline-sky-400"
            onChange={handleChange}
          />
        </div>
        <div className="w-3/4">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="w-full px-6 py-2 border-2 border-black rounded-xl"
            onChange={handleChange}
          />
        </div>
        <div className="w-3/4">
          <label htmlFor="password" className="label">
            Confirm password
          </label>
          <input
            type="password"
            name="confirmPassword"
            className="w-full px-6 py-2 border-2 border-black rounded-xl"
            onChange={handleChange}
          />
        </div>
        <span
          className={`italic text-red-600 opacity-0 ${
            errors !== "" && "opacity-100"
          }`}
        >
          {errors || "Nothing"}
        </span>
        <button
          type="submit"
          className="flex items-center justify-center w-3/4 px-6 py-2 border-2 border-black rounded-3xl hover:bg-zinc-200"
        >
          {loading ? (
            <RotatingLines width="24" strokeColor="blue" />
          ) : (
            "Register"
          )}
        </button>
      </form>
    </div>
  );
};
export default Register;
