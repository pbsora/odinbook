import { AuthData } from "@/assets/Types & Interfaces";
import { UserContext } from "@/lib/Context/UserContext";
import React, { useContext, useEffect, useState } from "react";
import { useChangePicture } from "@/lib/Queries/userQueries";
import { useToast } from "./Components/ui/use-toast";

const Settings = () => {
  const [, user] = useContext(UserContext) as AuthData;
  const [image, setImage] = useState<File | string>("");
  const imageForm = new FormData();
  const imageMutation = useChangePicture(imageForm);

  const { toast } = useToast();

  useEffect(() => {
    if (imageMutation.isSuccess) location.reload();
  }, [imageMutation, toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleNewPicture = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      return toast({
        title: "No image selected",
        description: "Please select an image",
      });
    }

    imageForm.append("image", image);
    imageForm.append("user_id", user._id);
    imageForm.append("profile_picture", user.image.id);

    imageMutation.mutate();
  };

  return (
    <div className="w-full 2xl:max-w-[55vw] border-2 rounded-xl  px-12 flex flex-col gap-12 shadow-xl bg-zinc-50 dark:bg-darkSecondary mt-6 border-zinc-400 p-6">
      <h1 className="text-4xl">Settings</h1>
      <form className="text-2xl" onSubmit={handleNewPicture}>
        <h2 className="mb-3">Profile picture</h2>
        <div className="flex items-center gap-10">
          <img
            src={user.image.url}
            alt="user profile picture"
            className="w-24"
          />
          <input
            className={`
             block
           w-2/4 h-fit mt-3 text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400`}
            id="large_size"
            onChange={handleFileChange}
            type="file"
          />
        </div>
        <button className="px-6 py-3 mt-3 text-lg text-white border rounded-xl bg-sky-500 dark:bg-zinc-600">
          Submit image
        </button>
      </form>

      <section className="flex flex-col w-3/4 gap-3 p-2">
        <label htmlFor="description" className="block mb-4 text-2xl">
          About me
        </label>
        <textarea
          name="description"
          id=""
          cols={30}
          rows={4}
          className="block w-full p-4 text-xl border-2 resize-none border-zinc-400 focus:outline-sky-400 rounded-xl"
        />
        <button className="self-start px-6 py-3 rounded-lg bg-sky-300">
          Submit
        </button>
      </section>
    </div>
  );
};
export default Settings;
