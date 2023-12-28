import { useParams } from "react-router-dom";
import { Fragment } from "react";
import PostDetails from "./Components/Post/PostDetails";
import { useGetComments, useGetPostDetails } from "../lib/Queries";
import { CommentResponse, PostResponse } from "../assets/Types & Interfaces";
import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import CommentSection from "./Components/Post/CommentSection";
import CommentItem from "./Components/Post/CommentItem";

const Post = () => {
  const { post_id } = useParams();
  const [post, setPost] = useState<PostResponse>();
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const postResponse = useGetPostDetails(post_id || "");
  const commentResponse = useGetComments(post_id || "");

  useEffect(() => {
    postResponse && setPost(postResponse.data?.data);
    postResponse && commentResponse && setComments(commentResponse.data?.data);
  }, [postResponse, commentResponse]);

  if (postResponse.error)
    return (
      <div className="h-[90vh] lg:h-[55vh]  w-full lg:w-[60vw] grid place-content-center border rounded-xl text-3xl">
        Post not found
      </div>
    );

  if (!post)
    return (
      <div className="h-[90vh] lg:h-[55vh]  w-full lg:w-[60vw] grid place-content-center border rounded-xl">
        <RotatingLines width="70" strokeColor="blue" />
      </div>
    );

  return (
    <div className="w-full lg:w-[60vw] border rounded-xl shadow-xl mb-20">
      <PostDetails post={post} setPost={setPost} />
      <div className="w-[90%] mt-6 px-4 m-auto border-b-2 border-zinc-700"></div>
      <CommentSection post_id={post._id} />
      <div className="w-[90%]  mt-6 px-4 m-auto border-b-2 border-zinc-700"></div>
      {comments
        ? comments.map((comment) => (
            <Fragment key={comment._id}>
              <CommentItem comment={comment} />
            </Fragment>
          ))
        : "Loading comments"}
    </div>
  );
};
export default Post;
