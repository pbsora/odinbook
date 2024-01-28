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
const RegisterFirstStep = ({ handleChange, form, errors, setStep }: Props) => {
  const handleNextStep = () => {
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim())
      return;

    setStep(2);
  };

  return (
    <>
      <div className="w-3/4">
        <label htmlFor="firstName" className="label ">
          First name
        </label>
        <input
          type="text"
          name="firstName"
          className="register-input"
          onChange={handleChange}
          value={form.firstName}
        />
      </div>
      <div className="w-3/4">
        <label htmlFor="lastName" className="label">
          Last name
        </label>
        <input
          type="text"
          name="lastName"
          className="register-input"
          onChange={handleChange}
          value={form.lastName}
        />
      </div>
      <div className="w-3/4">
        <label htmlFor="email" className="label">
          E-mail
        </label>
        <input
          type="email"
          name="email"
          className="register-input"
          onChange={handleChange}
          value={form.email}
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
        type="button"
        className={`flex items-center self-end justify-center w-[30%] px-6 py-2 transition-colors duration-200 border-2 border-black rounded-lg hover:bg-zinc-200
       `}
        onClick={handleNextStep}
      >
        Next
      </button>
    </>
  );
};
export default RegisterFirstStep;
