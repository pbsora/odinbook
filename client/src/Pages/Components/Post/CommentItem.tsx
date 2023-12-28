import { DateTime } from "ts-luxon";
import { CommentResponse } from "../../../assets/Types & Interfaces";
import { GrLike } from "react-icons/gr";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
import { capitalize } from "../../../utils/capitalize";

type Props = {
  comment: CommentResponse;
};
const CommentItem = ({ comment }: Props) => {
  return (
    <div className="w-[90%] m-auto mt-5 flex flex-col gap-10 py-6 border-b">
      <div key={comment._id} className={`flex items-center w-full gap-3`}>
        <img
          src={comment.author_id.image}
          alt="user picture"
          className="max-w-[3rem] rounded-full border-2 border-zinc-400 xl:max-w-[4rem]"
        />
        <Link to={`/u/${comment.author_id.username}`} className="text-xl">
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
        <button>
          <HiDotsHorizontal />
        </button>
      </div>
    </div>
  );
};
export default CommentItem;
