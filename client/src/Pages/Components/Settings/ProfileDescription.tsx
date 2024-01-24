import { useChangeDesc } from "@/lib/Queries/userQueries";
import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useToast } from "../ui/use-toast";
import { UserType } from "@/assets/Types & Interfaces";

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
    }
  }, [toast, descriptionMutation]);

  const handleDescription = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!desc.trim()) return;

    descriptionMutation.mutate();
  };

  return (
    <form
      className="flex flex-col w-[85%] gap-3 p-2"
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
        className="block w-full p-4 text-xl border-2 resize-none border-zinc-400 dark:bg-zinc-800 focus:outline-sky-400 rounded-xl"
        onChange={(e) => setDesc(e.target.value)}
        value={desc}
      />
      <button className="self-start px-6 py-3 rounded-lg w-25 bg-sky-300 dark:bg-zinc-600">
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
