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
      {!postsQuery.data?.pages[0].data && (
        <AllPostsInfinite nextPage={nextPage} />
      )}
      <ToTopButton />
    </motion.div>
  );
};
export default Feed;
