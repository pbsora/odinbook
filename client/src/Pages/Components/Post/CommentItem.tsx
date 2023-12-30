import { DateTime } from "ts-luxon";
import { AuthData, CommentResponse } from "../../../assets/Types & Interfaces";
import { GrLike } from "react-icons/gr";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
import { capitalize } from "../../../utils/capitalize";
import { UserContext } from "@/lib/Context/UserContext";
import { useContext } from "react";
import { useDeleteComment } from "@/lib/Queries";
import { UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useToast } from "../ui/use-toast";
import PostDialog from "./PostDialog";

type Props = {
  comment: CommentResponse;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  commentResponse: UseQueryResult<AxiosResponse<any, any>, Error>;
};
const CommentItem = ({ comment, commentResponse }: Props) => {
  const [, user] = useContext(UserContext) as AuthData;
  const ownComment = () => comment.author_id._id === user._id;
  const deleteMutation = useDeleteComment(comment._id);
  const { toast } = useToast();

  const handleDelete = () => {
    deleteMutation.mutate();
    toast({
      title: "Deleted successfully",
      description: "Comment deleted",
    });
    setTimeout(() => {
      commentResponse.refetch();
    }, 1000);
  };

  return (
    <div className="w-[90%] m-auto mt-5 flex flex-col gap-10 py-6 border-b">
      <div key={comment._id} className={`flex items-center w-full gap-3`}>
        <img
          src={comment.author_id.image}
          alt="user picture"
          className="max-w-[3rem] rounded-full border-2 border-zinc-400 xl:max-w-[4rem]"
        />
        <Link
          to={
            comment.author_id._id === user._id
              ? "/u/profile"
              : `/u/${comment.author_id.username}`
          }
          className="text-xl"
        >
          {capitalize(comment.author_id.username)}
        </Link>
        <span className="flex justify-end flex-1">
          {DateTime.fromJSDate(
            typeof comment.created_at === "string"
              ? new Date(comment.created_at)
              : comment.created_at
          ).toLocaleString(DateTime.DATETIME_SHORT)}
        </span>
      </div>
      <div className="text-xl">{comment.content}</div>
      <div className="flex justify-between px-4 text-2xl">
        <button className="flex items-center">
          <GrLike />
          10 Likes
        </button>
        <div className="relative group">
          <button className="flex items-center text-3xl lg:text-4xl ">
            <HiDotsHorizontal />
          </button>
          <PostDialog ownPost={ownComment} handleDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
};
export default CommentItem;
