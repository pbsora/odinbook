import { useContext, useEffect, useState } from "react";
import {
  useDeletePost,
  useLikePost,
  useUnlikePost,
} from "../../../lib/Queries/PostQueries";
import { useNavigate } from "react-router-dom";
import { AuthData, PostResponse } from "../../../assets/Types & Interfaces";
import { UserContext } from "../../../lib/Context/UserContext";
import { Link } from "react-router-dom";
import { capitalize } from "../../../utils/capitalize";
import { DateTime } from "ts-luxon";
import { GrLike } from "react-icons/gr";
import { FaCommentAlt } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import PostDialog from "./PostDialog";

type Props = {
  post: PostResponse;
  commentCount: number;
};

const PostDetails = ({ post, commentCount }: Props) => {
  const [, user] = useContext(UserContext) as AuthData;
  const [likedPost, setLikedPost] = useState(false);

  const ownPost = () => user._id === post.author_id._id;
  const navigate = useNavigate();

  const likeMutation = useLikePost(post._id, user._id);
  const unlikeMutation = useUnlikePost(post._id, user._id);
  const deleteMutation = useDeletePost(post._id);

  const isWide = () =>
    post.image?.url && imageDimensions.width >= imageDimensions.height;

  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (isLiked(user._id, post.likes)) setLikedPost(true);
    if (likeMutation.isSuccess) {
      setLikedPost(true);
      likeMutation.reset();
    }
    if (unlikeMutation.isSuccess) {
      setLikedPost(false);
      unlikeMutation.reset();
    }
    if (deleteMutation.isSuccess) navigate("/");
  }, [
    post.likes,
    user._id,
    likeMutation.isSuccess,
    unlikeMutation.isSuccess,
    deleteMutation,
    post._id,
    navigate,
  ]);

  // Load image dimensions
  useEffect(() => {
    const image = new Image();
    image.src = post.image?.url || "";

    image.onload = () => {
      setImageDimensions({
        width: image.width,
        height: image.height,
      });
    };
  }, [post.image?.url]);

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const handleLike = () => {
    likedPost ? unlikeMutation.mutate() : likeMutation.mutate();
  };

  return (
    <>
      <div className={`w-[95%] md:w-full m-auto h-fit flex flex-col  md:px-8`}>
        <div className="flex items-center gap-6 py-3 pl-6 text-2xl">
          <img
            className="w-[3rem] h-[3rem] rounded-full border-2 border-zinc-400 xl:max-w-[4rem]"
            src={post.author_id.image.url}
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
          <span className="flex justify-end flex-1 mr-12 text-lg">
            {DateTime.fromJSDate(
              typeof post.created_at === "string"
                ? new Date(post.created_at)
                : post.created_at
            ).toFormat("MM/dd/yyyy")}
          </span>
        </div>
        <div className="flex-1 p-6 text-xl ">
          <section>{post.content}</section>
          <div className="w-full ">
            {post.image && (
              <img
                src={post.image.url}
                alt="post image"
                className={`${
                  isWide()
                    ? "w-[80%]"
                    : "w-full sm:w-[80%] md:w-[70%] lg:w-[65%] xl:w-[60%]"
                } m-auto mt-4 rounded-xl`}
              />
            )}
          </div>
        </div>
        <div className="flex justify-around p-4 lg:p-8">
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
          <span className="flex items-center gap-4 text-lg lg:text-xl">
            <FaCommentAlt />{" "}
            {commentCount ? commentCount + " Comments" : "0 Comments"}
          </span>
          <div className="relative group">
            <button className="flex items-center text-3xl lg:text-3xl ">
              <HiDotsHorizontal />
            </button>
            <PostDialog ownPost={ownPost} handleDelete={handleDelete} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetails;

function isLiked(user_id: string, likes: string[]) {
  return likes.includes(user_id);
}
