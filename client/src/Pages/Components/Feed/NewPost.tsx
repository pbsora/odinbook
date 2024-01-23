import React, {
  ChangeEvent,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import { UserContext } from "../../../lib/Context/UserContext";
import { AuthData, PostResponse } from "../../../assets/Types & Interfaces";
import { RotatingLines } from "react-loader-spinner";
import { FaImage } from "react-icons/fa6";
import { usePostMutation } from "../../../lib/Queries/PostQueries";

type Props = {
  setAllPosts: React.Dispatch<React.SetStateAction<PostResponse[] | null>>;
};

const NewPost = ({ setAllPosts }: Props) => {
  const [post, setPost] = useState("");
  const [, user] = useContext(UserContext) as AuthData;
  const formData = new FormData();
  const newPostMutation = usePostMutation(formData);

  const [imageInput, setImageInput] = useState(false);
  const [image, setImage] = useState<File | string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (newPostMutation.isSuccess) {
      setPost("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (imageInput) setImageInput(false);
      setAllPosts((prev) => {
        const currentPosts = Array.isArray(prev) ? prev : [];
        return [newPostMutation.data.data, ...currentPosts];
      });
      newPostMutation.reset();
    }
  }, [newPostMutation, setAllPosts, imageInput]);

  const handleNewPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (image) formData.append("image", image);
    formData.append("author_id", user._id);
    formData.append("content", post);

    newPostMutation.mutate();
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPost(e.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div
      className={`w-full md:w-[75%]  lg:w-[60%]  xl:w-[60%] 2xl:w-[85%] m-auto border-b lg:border border-zinc-300 dark:border-zinc-700 lg:rounded-xl h-fit py-4 shadow-xl mb-5 dark:bg-darkSecondary bg-zinc-50 dark:text-slate-300`}
    >
      <form className=" w-[90vw] md:w-[80%] m-auto" onSubmit={handleNewPost}>
        <textarea
          name="post"
          cols={50}
          rows={3}
          className={`block w-full border-zinc-400 p-3 text-xl border-[3px] resize-none rounded-xl group dark:bg-zinc-800 dark:border-zinc-700 dark:border`}
          minLength={6}
          maxLength={320}
          onChange={handleChange}
          value={post}
          placeholder="What's on your mind?"
          required
        />
        <input
          className={`${
            imageInput ? "block" : "hidden"
          } w-full mt-3 text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400`}
          id="large_size"
          onChange={handleFileChange}
          type="file"
        />
        <div className="flex items-center justify-between mx-6 mt-4 ">
          <span className="text-lg group-hover:text-red-600">
            {post.length}/320
          </span>
          <div className="flex items-center gap-6">
            <button
              className="text-4xl duration-200 hover:scale-110 text-zinc-700 dark:text-white"
              type="button"
              onClick={() => setImageInput(true)}
            >
              <FaImage />
            </button>
            <button
              type="submit"
              className={`${
                newPostMutation.isPending && "bg-sky-700 cursor-not-allowed"
              }  px-16 py-4 text-lg text-white duration-300 bg-sky-500 rounded-2xl hover:bg-sky-600 `}
              disabled={newPostMutation.isPending}
            >
              {newPostMutation.isPending ? (
                <RotatingLines width="24" strokeColor="blue" />
              ) : (
                "Post"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default NewPost;
