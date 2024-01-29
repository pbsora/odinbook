type Props = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  form: {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  };
  errors: string;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};
const RegisterSecondStep = ({ handleChange, form, errors, setStep }: Props) => {
  return (
    <>
      <div className="w-full">
        <label htmlFor="username" className="label">
          Username
        </label>
        <input
          type="text"
          name="username"
          className="register-input"
          onChange={handleChange}
          value={form.username}
        />
      </div>
      <div className="w-full">
        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="register-input"
          onChange={handleChange}
          value={form.password}
        />
      </div>
      <div className="w-full">
        <label htmlFor="password" className="label">
          Confirm password
        </label>
        <input
          type="password"
          name="confirmPassword"
          className="register-input"
          onChange={handleChange}
          value={form.confirmPassword}
        />
      </div>
      <span
        className={`italic text-red-600 opacity-0 ${
          errors !== "" && "opacity-100"
        }`}
      >
        {errors || ""}
      </span>
      <div className="flex justify-between w-full mt-4">
        <button
          type="button"
          className={`flex dark:border-white items-center  justify-center w-[30%] px-6 py-2 transition-colors duration-200 border-2 border-black rounded-lg hover:bg-zinc-200
       `}
          onClick={() => setStep(1)}
        >
          Back
        </button>
        <button
          type="submit"
          className={`flex items-center dark:border-white  justify-center w-[30%] px-6 py-2 transition-colors duration-200 border-2 border-black rounded-lg hover:bg-zinc-200
        `}
        >
          Register
        </button>
      </div>
    </>
  );
};
export default RegisterSecondStep;
