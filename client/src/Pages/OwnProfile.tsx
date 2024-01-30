import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../lib/Context/UserContext";
import { AuthData } from "../assets/Types & Interfaces";
import Profile from "./Components/Profile/Profile";
import { useFetchPosts } from "../lib/Queries/PostQueries";
import { motion } from "framer-motion";
import AllPostsInfinite from "./Components/Discover/AllPostsInfinite";
import Timeline from "./Components/Feed/Timeline";
import ToTopButton from "./Components/Global/ToTopButton";

const OwnProfile = () => {
  const [, user] = useContext(UserContext) as AuthData;
  const postsQuery = useFetchPosts(user._id);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    profileRef.current &&
      profileRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start",
      });
    postsQuery.refetch();
  }, [postsQuery]);

  const nextPage = () => postsQuery.fetchNextPage();

  return (
    <motion.div
      className="w-full 2xl:max-w-[55vw]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <section ref={profileRef}>
        <Profile user={user} />
      </section>
      <Timeline data={postsQuery.data} refetch={postsQuery.refetch} />
      <AllPostsInfinite nextPage={nextPage} />
      <ToTopButton />
    </motion.div>
  );
};
export default OwnProfile;
