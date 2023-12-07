import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";

const Register = () => {
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="p-6 border-2 border-black w-[90%]  sm:w-3/4 rounded-xl ">
      <form
        action=""
        className="flex flex-col items-center w-3/4 gap-4 m-auto "
      >
        <div>
          <label htmlFor="firstName" className="block text-2xl">
            First name
          </label>
          <input
            type="text"
            name="firstName"
            className="px-6 py-2 border-2 border-black rounded-xl focus:outline-4 focus:outline-sky-400"
            minLength={3}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-2xl">
            Last name
          </label>
          <input
            type="text"
            name="lastName"
            className="px-6 py-2 border-2 border-black rounded-xl focus:outline-4 focus:outline-sky-400"
            minLength={3}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-2xl">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            className="px-6 py-2 border-2 border-black rounded-xl focus:outline-4 focus:outline-sky-400"
            minLength={3}
          />
        </div>
        <div>
          <label htmlFor="username" className="block text-2xl">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="px-6 py-2 border-2 border-black rounded-xl focus:outline-4 focus:outline-sky-400"
            minLength={3}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-2xl">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="px-6 py-2 border-2 border-black rounded-xl"
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
          {loading ? <RotatingLines width="24" strokeColor="blue" /> : "Log-in"}
        </button>
      </form>
    </div>
  );
};
export default Register;
