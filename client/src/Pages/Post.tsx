import { useParams } from "react-router-dom";
import PostDetails from "./Components/Post/PostDetails";
import { useGetPostDetails } from "../lib/Queries";
import { PostResponse } from "../assets/Types & Interfaces";
import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import CommentSection from "./Components/Post/CommentSection";

const Post = () => {
  const { post_id } = useParams();
  const [post, setPost] = useState<PostResponse>();
  const postResponse: PostResponse = useGetPostDetails(post_id || "").data
    ?.data;

  useEffect(() => {
    postResponse && setPost(postResponse);
  }, [postResponse]);

  if (!post)
    return (
      <div className="w-[60vw] grid place-content-center border rounded-xl">
        <RotatingLines width="70" strokeColor="blue" />
      </div>
    );

  return (
    <div className="w-[60vw] border rounded-xl shadow-xl">
      <PostDetails post={post} setPost={setPost} />
      <div className="w-[90%] mt-6 px-4 m-auto border-b-2 border-zinc-700"></div>
      <CommentSection />
    </div>
  );
};
export default Post;
