import { useFetchPosts } from "../lib/Queries/PostQueries";

import Timeline from "./Components/Feed/Timeline";
import { useTab } from "./Home";
import { motion } from "framer-motion";
import AllPostsInfinite from "./Components/Discover/AllPostsInfinite";

const Discover = () => {
  const postsQuery = useFetchPosts();
  const { open } = useTab();

  const nextPage = () => postsQuery.fetchNextPage();

  return (
    <motion.div
      className={`w-full 2xl:w-[55vw] ${open && "hidden"} z-[-1000px] md:mt-6 `}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Timeline refetch={postsQuery.refetch} data={postsQuery.data} />
      <AllPostsInfinite nextPage={nextPage} />
    </motion.div>
  );
};
export default Discover;
