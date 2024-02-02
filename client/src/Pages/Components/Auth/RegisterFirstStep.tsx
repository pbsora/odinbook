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
const RegisterFirstStep = ({ handleChange, form, setStep }: Props) => {
  const handleNextStep = () => {
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim())
      return;

    setStep(2);
  };

  return (
    <>
      <div className="w-[85%]">
        <label htmlFor="firstName" className="label ">
          First name
        </label>
        <input
          type="text"
          name="firstName"
          className="register-input"
          onChange={handleChange}
          value={form.firstName}
          placeholder="Name"
          required
        />
      </div>
      <div className="w-[85%]">
        <label htmlFor="lastName" className="label">
          Last name
        </label>
        <input
          type="text"
          name="lastName"
          className="register-input"
          onChange={handleChange}
          value={form.lastName}
          placeholder="Last name"
          required
        />
      </div>
      <div className="w-[85%]">
        <label htmlFor="email" className="label">
          E-mail
        </label>
        <input
          type="email"
          name="email"
          className="register-input"
          onChange={handleChange}
          value={form.email}
          placeholder="email@email.com"
          required
        />
      </div>

      <button
        type="button"
        className={`flex items-center mt-8 dark:border-white self-end justify-center w-[30%] px-6 py-2 transition-colors duration-200 border-2 border-black rounded-lg hover:bg-zinc-200
       `}
        onClick={handleNextStep}
      >
        Next
      </button>
    </>
  );
};
export default RegisterFirstStep;
