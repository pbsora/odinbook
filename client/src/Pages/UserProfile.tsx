import Profile from "./Components/Profile/Profile";
import { useLoaderData } from "react-router-dom";
import { useFetchPosts } from "../lib/Queries/PostQueries";
import { AuthData, UserType } from "../assets/Types & Interfaces";
import Timeline from "./Components/Feed/Timeline";
import { useContext, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useGetRelationship } from "@/lib/Queries/userQueries";
import { UserContext } from "@/lib/Context/UserContext";
import AllPostsInfinite from "./Components/Discover/AllPostsInfinite";

const UserProfile = () => {
  const [, currentUser] = useContext(UserContext) as AuthData;
  const user = useLoaderData() as UserType;
  const postsQuery = useFetchPosts(user._id);
  const relationship = useGetRelationship(currentUser._id, user._id);

  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    profileRef.current &&
      profileRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start",
      });
  }, []);

  const nextPage = () => postsQuery.fetchNextPage();

  return (
    <motion.div
      className="w-full 2xl:max-w-[55vw]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <section ref={profileRef}>
        <Profile user={user} relationship={relationship} />
      </section>
      <Timeline data={postsQuery.data} refetch={postsQuery.refetch} />
      <AllPostsInfinite nextPage={nextPage} />
    </motion.div>
  );
};
export default UserProfile;
