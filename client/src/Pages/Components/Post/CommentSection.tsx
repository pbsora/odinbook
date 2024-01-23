import { FormEvent, useContext, useEffect, useState } from "react";
import { UserContext } from "../../../lib/Context/UserContext";
import { AuthData } from "../../../assets/Types & Interfaces";
import { useComment } from "../../../lib/Queries/Queries";
import { useToast } from "../ui/use-toast";
import { UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { RotatingLines } from "react-loader-spinner";

type Props = {
  post_id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  commentResponse: UseQueryResult<AxiosResponse<any, any>, Error>;
};

const CommentSection = ({ post_id, commentResponse }: Props) => {
  const [, user] = useContext(UserContext) as AuthData;
  const [comment, setComment] = useState("");
  const commentMutation = useComment(post_id, user._id, comment);
  const { toast } = useToast();

  useEffect(() => {
    if (commentMutation.isSuccess) {
      toast({
        title: "Success",
        description: "Comment added sucessfully",
        className: "text-xl",
      });
      commentMutation.reset();
    }
  });

  const handleNewComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    commentMutation.mutate();
    setTimeout(() => {
      setComment("");
    }, 0);
    setTimeout(() => {
      commentResponse.refetch();
    }, 100);
  };

  return (
    <div className="flex justify-center w-full mt-6 mb-3 h-fit">
      <form action="" className="w-[90%] h-fit" onSubmit={handleNewComment}>
        <textarea
          name="comment"
          cols={30}
          rows={4}
          placeholder="Got something cool to add?"
          className="w-full p-4 text-xl border-2 resize-none rounded-xl border-zinc-400 dark:bg-zinc-800"
          onChange={(e) => setComment(e.target.value)}
          maxLength={160}
          value={comment}
        />
        <div className="flex items-center justify-between w-full px-6 mt-4">
          <span>{comment.length}/160</span>
          <button
            type="submit"
            className={`p-5 w-40 border rounded-xl bg-sky-400  ${
              commentMutation.isPending && "cursor-not-allowed"
            }`}
            disabled={commentMutation.isPending}
          >
            {commentMutation.isPending ? (
              <RotatingLines width="24" strokeColor="blue" />
            ) : (
              "Comment"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
export default CommentSection;
