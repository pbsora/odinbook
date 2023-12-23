import React, { ChangeEvent, useState, useContext } from "react";
import { UserContext } from "../../../lib/Context/UserContext";
import { API } from "../../../utils/api";
import { useMutation } from "@tanstack/react-query";
import { AuthData, PostResponse } from "../../../assets/Types & Interfaces";
import { RotatingLines } from "react-loader-spinner";

type Props = {
  setAllPosts: React.Dispatch<React.SetStateAction<PostResponse[] | null>>;
};

const NewPost = ({ setAllPosts }: Props) => {
  const [post, setPost] = useState("");
  const [, user] = useContext(UserContext) as AuthData;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPost(e.target.value);
  };

  const newPostMutation = useMutation({
    mutationKey: ["newPost"],
    mutationFn: async () => {
      return await API.post("post/new-post", {
        author_id: user._id,
        content: post,
      });
    },
    onSuccess: (data) => {
      console.log(data);
      setPost("");
      setAllPosts((prev) => {
        const currentPosts = Array.isArray(prev) ? prev : [];
        return [data.data, ...currentPosts];
      });
    },
  });

  const handleNewPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    newPostMutation.mutate();
  };

  return (
    <div className="w-full border-b lg:border border-zinc-400 lg:rounded-xl min-h-[25vh] py-4 shadow-xl">
      <form className=" w-[90vw] md:w-[80%] m-auto" onSubmit={handleNewPost}>
        <textarea
          name="post"
          cols={50}
          rows={5}
          className="block w-full p-3 text-xl border-[3px] resize-none rounded-xl border-zinc-400 focus:outline-sky-500 group"
          minLength={6}
          maxLength={320}
          onChange={handleChange}
          value={post}
          placeholder="What's on your mind?"
          required
        />
        <div className="flex items-center justify-between mx-6 mt-4 ">
          <span className="text-lg group-hover:text-red-600">
            {post.length}/320
          </span>
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
      </form>
    </div>
  );
};
export default NewPost;
