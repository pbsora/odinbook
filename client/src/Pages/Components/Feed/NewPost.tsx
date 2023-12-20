import { ChangeEvent, useState } from "react";

const NewPost = () => {
  const [post, setPost] = useState("");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPost(e.target.value);
  };

  return (
    <div className="w-full border border-zinc-400 rounded-xl min-h-[25vh] py-4 shadow-xl">
      <div className=" w-[90vw] md:w-[80%] m-auto">
        <textarea
          name="post"
          cols={50}
          rows={5}
          className="block w-full p-3 text-xl   border-[3px] resize-none rounded-xl border-zinc-400 focus:outline-sky-500"
          maxLength={160}
          onChange={handleChange}
          placeholder="What's on your mind?"
        />
        <div className="flex items-center justify-between mx-6 mt-4">
          <span className="text-lg">{post.length}/160</span>
          <button className="px-16 py-4 text-white duration-300 bg-sky-500 rounded-2xl hover:bg-sky-600">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};
export default NewPost;
