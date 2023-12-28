import { useState } from "react";

const CommentSection = () => {
  const [comment, setComment] = useState("");

  return (
    <div className="w-full mt-6 h-[40vh] flex justify-center">
      <form action="" className="w-[90%]">
        <textarea
          name="comment"
          cols={30}
          rows={4}
          placeholder="Got something cool to add?"
          className="w-full p-4 text-xl border-2 resize-none rounded-xl border-zinc-400"
          onChange={(e) => setComment(e.target.value)}
          maxLength={160}
        />
        <div className="flex items-center justify-between w-full px-6 mt-4">
          <span>{comment.length}/160</span>
          <button type="submit" className="p-5 border rounded-xl bg-sky-400">
            Comment
          </button>
        </div>
      </form>
    </div>
  );
};
export default CommentSection;
