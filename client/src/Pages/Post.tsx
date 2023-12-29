import { Link, useParams } from "react-router-dom";
import { Fragment } from "react";
import PostDetails from "./Components/Post/PostDetails";
import { useGetComments, useGetPostDetails } from "../lib/Queries";
import { CommentResponse, PostResponse } from "../assets/Types & Interfaces";
import { RotatingLines } from "react-loader-spinner";
import CommentSection from "./Components/Post/CommentSection";
import CommentItem from "./Components/Post/CommentItem";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Post = () => {
  const { post_id } = useParams();
  const [parent] = useAutoAnimate();
  const postResponse = useGetPostDetails(post_id || "");
  const postData = postResponse.data?.data as PostResponse;
  const commentResponse = useGetComments(post_id || "").data
    ?.data as CommentResponse[];

  if (postResponse.error)
    return (
      <div className="h-[90vh] lg:h-[55vh]  w-full lg:w-[60vw] grid place-content-center border rounded-xl text-3xl">
        Post not found
      </div>
    );

  if (!postData)
    return (
      <div className="h-[90vh] lg:h-[55vh]  w-full lg:w-[60vw] grid place-content-center border rounded-xl">
        <RotatingLines width="70" strokeColor="blue" />
      </div>
    );

  return (
    <div
      className="w-full lg:w-[60vw] border rounded-xl shadow-xl mb-20"
      ref={parent}
    >
      <Link to={"/"} className="lg:hidden">
        <button className="ml-5 text-3xl">{"<-"}</button>
      </Link>
      <PostDetails post={postData} />
      <div className="w-[90%] mt-6 px-4 m-auto border-b-2 border-zinc-700"></div>
      <CommentSection post_id={postData._id} />
      <div className="w-[90%]  mt-6 px-4 m-auto border-b-2 border-zinc-700"></div>
      {commentResponse
        ? commentResponse.map((comment) => (
            <Fragment key={comment._id}>
              <CommentItem comment={comment} />
            </Fragment>
          ))
        : "Loading comments"}
    </div>
  );
};
export default Post;
