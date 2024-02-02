import { useChangeDesc } from "@/lib/Queries/userQueries";
import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useToast } from "../ui/use-toast";
import { UserType } from "@/assets/Types & Interfaces";
import { AxiosError } from "axios";

type Props = {
  user: UserType;
};
const ProfileDescription = ({ user }: Props) => {
  const [desc, setDesc] = useState(user.description);
  const descriptionMutation = useChangeDesc(desc, user._id);

  const { toast } = useToast();

  useEffect(() => {
    if (descriptionMutation.isSuccess) {
      toast({
        title: "Success",
        description: "Your description was changed with success",
      });
      descriptionMutation.reset();
    } else if (descriptionMutation.isError) {
      const res = descriptionMutation.failureReason as AxiosError;
      const error = res.response?.data as { error: string };
      toast({
        title: "error",
        description: error.error,
      });
      descriptionMutation.reset();
    }
  }, [
    toast,
    descriptionMutation.isSuccess,
    descriptionMutation.isError,
    descriptionMutation.failureReason,
  ]);

  const handleDescription = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!desc.trim()) return;

    descriptionMutation.mutate();
  };

  return (
    <form
      className="flex flex-col lg:w-[85%] gap-3 md:p-2"
      onSubmit={handleDescription}
    >
      <label htmlFor="description" className="block mb-4 text-2xl">
        About me
      </label>
      <textarea
        name="description"
        id=""
        cols={30}
        rows={4}
        maxLength={320}
        className="block w-full p-4 text-lg border-2 resize-none border-zinc-400 dark:bg-zinc-800 focus:outline-sky-400 rounded-xl"
        onChange={(e) => setDesc(e.target.value)}
        value={desc}
      />
      <p className="self-end">{desc.length}/320</p>
      <button className="self-start px-6 py-3 text-white duration-200 rounded-lg w-25 bg-sky-500 dark:bg-zinc-600 hover:dark:bg-zinc-700">
        {descriptionMutation.isPending ? (
          <RotatingLines width="30" strokeColor="blue" />
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};
export default ProfileDescription;
