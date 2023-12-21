import { PostResponse } from "../../../assets/Types & Interfaces";
import { Link } from "react-router-dom";
import { capitalize } from "../../../utils/capitalize";
import { GrLike } from "react-icons/gr";
import { FaCommentAlt } from "react-icons/fa";

type Props = { post: PostResponse; index: number };

const PostItem = ({ post }: Props) => {
  return (
    <div
      className={`first:mt-5 mt-16 w-[95%] md:w-[85%] border m-auto h-fit flex flex-col rounded-xl shadow-xl`}
    >
      <div className="flex items-center gap-6 py-3 pl-6 text-2xl">
        <img
          className="max-w-[3rem] rounded-full border-2 border-zinc-400 xl:max-w-[4rem]"
          src={post.author_id.image}
          alt="post creator image"
        />
        <Link
          to={"u/" + post.author_id.username}
          className="transition-all duration-400 hover:border-b hover:border-zinc-400"
        >
          {capitalize(post.author_id.username)}
        </Link>
      </div>
      <div className="flex-1 p-6 text-2xl">
        <section>{post.content}</section>
      </div>
      <div className="flex p-8 gap-52">
        <button className="flex items-center gap-4 text-2xl">
          <GrLike /> Like
        </button>
        <button className="flex items-center gap-4 text-2xl">
          <FaCommentAlt /> Comments
        </button>
      </div>
    </div>
  );
};
export default PostItem;
