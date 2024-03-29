import { Link, useParams } from "react-router-dom";
import { Fragment, useEffect } from "react";
import PostDetails from "./Components/Post/PostDetails";
import { useGetComments, useGetPostDetails } from "../lib/Queries/PostQueries";
import { CommentResponse, PostResponse } from "../assets/Types & Interfaces";
import { RotatingLines } from "react-loader-spinner";
import CommentSection from "./Components/Post/CommentSection";
import CommentItem from "./Components/Post/CommentItem";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { motion } from "framer-motion";
import { FaLongArrowAltLeft } from "react-icons/fa";

const Post = () => {
  const { post_id } = useParams();
  const postResponse = useGetPostDetails(post_id || "");
  const postData = postResponse.data?.data as PostResponse;
  const commentResponse = useGetComments(post_id || "");
  const commentData = commentResponse.data?.data as CommentResponse[];

  const [parent] = useAutoAnimate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [postData]);

  if (postResponse.error)
    return (
      <div className="h-[90vh] lg:h-[55vh] w-full lg:w-[60vw] grid place-content-center border rounded-xl text-3xl">
        Post not found
      </div>
    );

  if (!postData)
    return (
      <div className="h-[90vh] lg:h-[55vh] w-full lg:w-[60vw] grid place-content-center  border-zinc-400 ">
        <RotatingLines width="70" strokeColor="blue" />
      </div>
    );

  return (
    <motion.div
      className="w-full lg:w-[55vw] border rounded-xl shadow-xl mb-12 h-fit bg-zinc-50 dark:border-zinc-700 dark:bg-darkSecondary lg:mt-6 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Link to={"/"} className="lg:hidden">
        <button className="pt-2 pl-4 ml-5 text-3xl">
          <FaLongArrowAltLeft />
        </button>
      </Link>
      <PostDetails post={postData} commentCount={commentData?.length} />
      <hr className="w-[90%] mt-6 px-4 m-auto border-b border-zinc-700" />
      <CommentSection
        post_id={postData._id}
        commentResponse={commentResponse}
      />
      {commentResponse.isSuccess && commentData.length !== 0 ? (
        <hr
          className={`w-[90%] mt-6 px-4 m-auto
          border-b
         border-zinc-700 `}
        />
      ) : (
        ""
      )}

      <div ref={parent}>
        {commentData && commentData.length
          ? commentData.map((comment) => (
              <Fragment key={comment._id}>
                <CommentItem
                  comment={comment}
                  commentResponse={commentResponse}
                />
              </Fragment>
            ))
          : ""}
      </div>
    </motion.div>
  );
};
export default Post;
