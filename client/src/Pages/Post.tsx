import { Link, useParams } from "react-router-dom";
import { Fragment, useEffect } from "react";
import PostDetails from "./Components/Post/PostDetails";
import { useGetComments, useGetPostDetails } from "../lib/Queries";
import { CommentResponse, PostResponse } from "../assets/Types & Interfaces";
import { RotatingLines } from "react-loader-spinner";
import CommentSection from "./Components/Post/CommentSection";
import CommentItem from "./Components/Post/CommentItem";
// import { useAutoAnimate } from "@formkit/auto-animate/react";
import { motion } from "framer-motion";

const Post = () => {
  const { post_id } = useParams();
  const postResponse = useGetPostDetails(post_id || "");
  const postData = postResponse.data?.data as PostResponse;
  const commentResponse = useGetComments(post_id || "");
  const commentData = commentResponse.data?.data as CommentResponse[];

  // const [parent] = useAutoAnimate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [postData]);

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
    <motion.div
      className="w-full lg:w-[60vw] border rounded-xl shadow-xl mb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <Link to={"/"} className="lg:hidden">
        <button className="ml-5 text-3xl">{"<-"}</button>
      </Link>
      <PostDetails post={postData} commentCount={commentData?.length} />
      <div className="w-[90%] mt-6 px-4 m-auto border-b-2 border-zinc-700"></div>
      <CommentSection
        post_id={postData._id}
        commentResponse={commentResponse}
      />
      <div className="w-[90%]  mt-6 px-4 m-auto border-b-2 border-zinc-700"></div>
      {commentData
        ? commentData.map((comment) => (
            <Fragment key={comment._id}>
              <CommentItem
                comment={comment}
                commentResponse={commentResponse}
              />
            </Fragment>
          ))
        : "Loading comments"}
    </motion.div>
  );
};
export default Post;
