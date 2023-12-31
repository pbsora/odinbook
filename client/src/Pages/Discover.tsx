import { useEffect, useState } from "react";
import { PostResponse } from "../assets/Types & Interfaces";
import { useFetchPosts } from "../lib/Queries/PostQueries";

import Timeline from "./Components/Feed/Timeline";
import { useTab } from "./Home";
import { motion } from "framer-motion";

const Discover = () => {
  const posts: PostResponse[] = useFetchPosts().data?.data;
  const [allPosts, setAllPosts] = useState<PostResponse[] | null>(null);
  const { open } = useTab();

  useEffect(() => {
    posts && setAllPosts(posts);
  }, [posts]);

  return (
    <motion.div
      className={`w-full 2xl:w-[55vw] ${open && "hidden"} z-[-1000px] md:mt-6 `}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Timeline posts={allPosts} setAllPosts={setAllPosts} />
    </motion.div>
  );
};
export default Discover;
