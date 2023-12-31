import { useContext, useEffect, useState } from "react";
import { AuthData, PostResponse } from "../assets/Types & Interfaces";
import { useFollowingPosts } from "../lib/Queries/PostQueries";
import NewPost from "./Components/Feed/NewPost";
import Timeline from "./Components/Feed/Timeline";
import { useTab } from "./Home";
import { motion } from "framer-motion";
import { UserContext } from "@/lib/Context/UserContext";

const Feed = () => {
  const [, user] = useContext(UserContext) as AuthData;
  const posts: PostResponse[] = useFollowingPosts(user._id).data?.data;
  const [allPosts, setAllPosts] = useState<PostResponse[] | null>(null);
  const { open } = useTab();

  useEffect(() => {
    posts && setAllPosts(posts);
  }, [posts]);

  return (
    <motion.div
      className={`w-full 2xl:w-[55vw] ${open && "hidden"} lg:mt-6 z-[-1000px] `}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <NewPost setAllPosts={setAllPosts} />
      <Timeline posts={allPosts} setAllPosts={setAllPosts} />
    </motion.div>
  );
};
export default Feed;
