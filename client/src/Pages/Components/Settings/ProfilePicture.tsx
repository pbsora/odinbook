import { RotatingLines } from "react-loader-spinner";
import { useChangePicture } from "@/lib/Queries/userQueries";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { UserType } from "@/assets/Types & Interfaces";

type Props = {
  user: UserType;
};

const ProfilePicture = ({ user }: Props) => {
  const [image, setImage] = useState<File | string>("");
  const imageForm = new FormData();
  const imageMutation = useChangePicture(imageForm);

  const { toast } = useToast();

  useEffect(() => {
    if (imageMutation.isSuccess) location.reload();
  }, [imageMutation]);

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
    <>
      <h1 className="text-4xl">Settings</h1>
      <form className="text-2xl" onSubmit={handleNewPicture}>
        <h2 className="mb-3">Profile picture</h2>
        <div className="items-center gap-10 md:flex">
          <img
            src={user.image.url}
            alt="user profile picture"
            className="w-24 "
          />
          <input
            className={`
             block
           w-full md:w-3/4 h-fit mt-3 text-lg  text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400`}
            id="large_size"
            onChange={handleFileChange}
            type="file"
          />
        </div>
        <button className="px-6 py-3 mt-3 text-lg text-white duration-200 border rounded-xl bg-sky-500 dark:bg-zinc-600 hover:dark:bg-zinc-700">
          {imageMutation.isPending ? (
            <RotatingLines width="30" strokeColor="blue" />
          ) : (
            "Submit image"
          )}
        </button>
      </form>
    </>
  );
};
export default ProfilePicture;
