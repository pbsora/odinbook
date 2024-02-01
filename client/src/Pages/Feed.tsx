import { useContext } from "react";
import { AuthData } from "../assets/Types & Interfaces";
import { useFollowingPosts } from "../lib/Queries/PostQueries";
import NewPost from "./Components/Feed/NewPost";
import Timeline from "./Components/Feed/Timeline";
import { useTab } from "./Home";
import { motion } from "framer-motion";
import { UserContext } from "@/lib/Context/UserContext";
import AllPostsInfinite from "./Components/Discover/AllPostsInfinite";
import ToTopButton from "./Components/Global/ToTopButton";
import end_of_timeline from "../assets/end_of_timeline.svg";
import { Link } from "react-router-dom";

const Feed = () => {
  const [, user] = useContext(UserContext) as AuthData;
  const postsQuery = useFollowingPosts(user._id);
  const { open } = useTab();

  const nextPage = () => postsQuery.fetchNextPage();

  return (
    <motion.div
      className={`w-full 2xl:w-[55vw] ${open && "hidden"} lg:mt-6 z-[-1000px] `}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <NewPost refetch={postsQuery.refetch} />
      <Timeline data={postsQuery.data} refetch={postsQuery.refetch} />
      {postsQuery.data?.pages[0].data && postsQuery.hasNextPage ? (
        <AllPostsInfinite nextPage={nextPage} />
      ) : (
        <div className="flex flex-col items-center gap-3 mb-6 text-center">
          <img src={end_of_timeline} alt="end svg" className="w-1/4" />
          <h2 className="text-xl">Nothing here yet</h2>
          <Link
            to={"/discover"}
            className="mb-10 text-xl duration-200 hover:text-blue-400 hover:border-b hover:border-blue-400"
          >
            Click here to go to the Discover page
          </Link>
        </div>
      )}
      <ToTopButton />
    </motion.div>
  );
};
export default Feed;
