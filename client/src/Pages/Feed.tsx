import { useEffect, useState } from "react";
import { PostResponse } from "../assets/Types & Interfaces";
import { useFetchPosts } from "../lib/Queries";
import NewPost from "./Components/Feed/NewPost";
import Timeline from "./Components/Feed/Timeline";
import { useTab } from "./Home";
import { motion } from "framer-motion";

const Feed = () => {
  const posts: PostResponse[] = useFetchPosts().data?.data;
  const [allPosts, setAllPosts] = useState<PostResponse[] | null>(null);
  const { open } = useTab();

  useEffect(() => {
    posts && setAllPosts(posts);
  }, [posts]);

  return (
    <motion.div
      className={`w-full 2xl:w-[55vw] ${open && "hidden"} z-[-1000px] `}
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
