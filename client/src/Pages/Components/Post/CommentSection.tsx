import { FormEvent, useContext, useState } from "react";
import { UserContext } from "../../../lib/Context/UserContext";
import { AuthData } from "../../../assets/Types & Interfaces";
import { useComment } from "../../../lib/Queries";

type Props = {
  post_id: string;
};

const CommentSection = ({ post_id }: Props) => {
  const [, user] = useContext(UserContext) as AuthData;
  const [comment, setComment] = useState("");
  const commentMutation = useComment(post_id, user._id, comment);

  const handleNewComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    commentMutation.mutate();
  };

  return (
    <div className="flex justify-center w-full mt-6 h-fit">
      <form action="" className="w-[90%] h-fit" onSubmit={handleNewComment}>
        <textarea
          name="comment"
          cols={30}
          rows={4}
          placeholder="Got something cool to add?"
          className="w-full p-4 text-xl border-2 resize-none rounded-xl border-zinc-400"
          onChange={(e) => setComment(e.target.value)}
          maxLength={160}
          value={comment}
        />
        <div className="flex items-center justify-between w-full px-6 mt-4">
          <span>{comment.length}/160</span>
          <button
            type="submit"
            className={`p-5 border rounded-xl bg-sky-400 ${
              commentMutation.isPending && "cursor-not-allowed"
            }`}
            disabled={commentMutation.isPending}
          >
            Comment
          </button>
        </div>
      </form>
    </div>
  );
};
export default CommentSection;
