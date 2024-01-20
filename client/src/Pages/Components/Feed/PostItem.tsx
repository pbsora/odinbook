import { AuthData, PostResponse } from "../../../assets/Types & Interfaces";
import { Link } from "react-router-dom";
import { capitalize } from "../../../utils/capitalize";
import { GrLike } from "react-icons/gr";
import { FaCommentAlt } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../lib/Context/UserContext";

import {
  useDeletePost,
  useLikePost,
  useUnlikePost,
} from "../../../lib/Queries/Queries";
import { DateTime } from "ts-luxon";
import PostDialog from "../Post/PostDialog";

type Props = {
  post: PostResponse;
  deletePost?: (post_id: string) => void;
};

const PostItem = ({ post, deletePost }: Props) => {
  const [, user] = useContext(UserContext) as AuthData;
  const [likedPost, setLikedPost] = useState(false);
  const ownPost = () => user._id === post.author_id._id;

  const likeMutation = useLikePost(post._id, user._id);
  const unlikeMutation = useUnlikePost(post._id, user._id);
  const deleteMutation = useDeletePost(post._id);

  useEffect(() => {
    if (isLiked(user._id, post.likes)) setLikedPost(true);
    if (likeMutation.isSuccess) setLikedPost(true);
    if (unlikeMutation.isSuccess) setLikedPost(false);
    if (deleteMutation.isSuccess) deletePost && deletePost(post._id);
  }, [
    post.likes,
    user._id,
    likeMutation,
    unlikeMutation,
    deletePost,
    deleteMutation,
    post._id,
  ]);

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const handleLike = () => {
    likedPost ? unlikeMutation.mutate() : likeMutation.mutate();
  };

  return (
    <div
      key={post._id}
      className={`first:mt-0 mt-5 w-[95%] md:w-[75%] lg:w-[85%] border m-auto h-fit flex flex-col rounded-xl text-zinc-700 dark:text-white bg-neutral-50 border-zinc-300 dark:bg-darkSecondary dark:border-zinc-700 shadow-md duration-200 hover:shadow-xl`}
    >
      <div className="flex items-center gap-6 py-3 pl-6 text-2xl">
        <img
          className="max-w-[3rem] rounded-full border-2 border-zinc-400 xl:max-w-[3rem]"
          src={post.author_id.image}
          alt="post creator image"
        />
        <Link
          to={
            post.author_id._id === user._id
              ? "/u/profile"
              : `/u/${post.author_id.username}`
          }
          className="text-xl transition-all duration-400 hover:border-b hover:border-zinc-400"
        >
          {capitalize(post.author_id.username)}
        </Link>
        <span className="flex justify-end flex-1 mr-12 text-lg text-end">
          {DateTime.fromJSDate(
            typeof post.created_at === "string"
              ? new Date(post.created_at)
              : post.created_at
          ).toLocaleString(DateTime.DATE_SHORT)}
        </span>
      </div>
      <div className="flex-1 p-6 text-lg md:text-xl">
        <section>{post.content}</section>
        <img
          src="https://images.unsplash.com/photo-1703587152450-e4534707e4a4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="w-full md:w-[65%] m-auto mt-4 border rounded-xl"
        />
      </div>
      <div className="flex justify-around p-4 lg:p-6 text-zinc-600 dark:text-white">
        <button
          className={`flex items-center gap-4 text-lg lg:text-xl ${
            likedPost && "text-sky-500"
          }`}
          disabled={likeMutation.isPending || unlikeMutation.isPending}
          onClick={handleLike}
        >
          <GrLike />{" "}
          {post.likes.length === 1
            ? post.likes.length + " Like"
            : post.likes.length + " Likes"}
        </button>
        <Link
          to={`/post/${post._id}`}
          className="flex items-center gap-4 text-lg lg:text-xl"
        >
          <FaCommentAlt /> Comments
        </Link>
        <div className="relative group">
          <button className="flex items-center text-3xl lg:text-3xl ">
            <HiDotsHorizontal />
          </button>
          <PostDialog handleDelete={handleDelete} ownPost={ownPost} />
        </div>
      </div>
    </div>
  );
};
export default PostItem;

function isLiked(user_id: string, likes: string[]) {
  return likes.includes(user_id);
}
