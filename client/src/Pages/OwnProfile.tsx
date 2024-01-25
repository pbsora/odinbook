import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../lib/Context/UserContext";
import { AuthData, PostResponse } from "../assets/Types & Interfaces";
import Profile from "./Components/Profile/Profile";
import Timeline from "./Components/Feed/Timeline";
import { useFetchPosts } from "../lib/Queries/PostQueries";
import { motion } from "framer-motion";

const OwnProfile = () => {
  const [profilePosts, setProfilePosts] = useState<PostResponse[] | null>(null);
  const [, user] = useContext(UserContext) as AuthData;
  const posts: PostResponse[] = useFetchPosts(user._id).data?.data;
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    profileRef.current &&
      profileRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start",
      });

    if (posts) setProfilePosts(posts);
  }, [posts]);

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
      <Timeline posts={profilePosts} setAllPosts={setProfilePosts} />
    </motion.div>
  );
};
export default OwnProfile;
