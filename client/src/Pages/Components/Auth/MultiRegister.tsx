import React, { useState } from "react";
import { useRegister } from "../../../lib/Queries/userQueries";
import RegisterFirstStep from "./RegisterFirstStep";
import RegisterSecondStep from "./RegisterSecondStep";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const matchPassword = (pass: string, secondPass: string) => {
  return pass === secondPass;
};

const isBlank = (obj: Form) => {
  return Object.values(obj).some((value) => {
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

const MultiRegister = ({ setAuth }: Props) => {
  const [errors, setErrors] = useState("");
  const [step, setStep] = useState(1);
  const [parent] = useAutoAnimate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const registerMutation = useRegister(
    form.firstName,
    form.lastName,
    form.email,
    form.username,
    form.password
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isBlank(form)) {
      return setErrors("Please fill every input");
    }

    const { password, confirmPassword } = form;
    if (!matchPassword(password, confirmPassword)) {
      return setErrors("Passwords don't match");
    }

    registerMutation.mutate();
  };

  return (
    <div className="py-6 px-3 border-2 border-black w-[90%]  sm:w-3/4 rounded-xl text-xl h-fit">
      <form
        action=""
        className="flex flex-col items-center w-full gap-4 m-auto md:w-3/4 "
        onSubmit={handleRegister}
        ref={parent}
      >
        {step === 1 ? (
          <RegisterFirstStep
            handleChange={handleChange}
            form={form}
            errors={errors}
            setStep={setStep}
          />
        ) : (
          <RegisterSecondStep
            handleChange={handleChange}
            form={form}
            errors={errors}
            setStep={setStep}
          />
        )}
      </form>
    </div>
  );
};
export default MultiRegister;
