import Profile from "./Components/Profile/Profile";
import { useLoaderData } from "react-router-dom";
import { useFetchPosts } from "../lib/Queries/PostQueries";
import { AuthData, PostResponse, UserType } from "../assets/Types & Interfaces";
import Timeline from "./Components/Feed/Timeline";
import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGetRelationship } from "@/lib/Queries/userQueries";
import { UserContext } from "@/lib/Context/UserContext";

const UserProfile = () => {
  const [profilePosts, setProfilePosts] = useState<PostResponse[] | null>(null);
  const [, currentUser] = useContext(UserContext) as AuthData;
  const user = useLoaderData() as UserType;
  const posts: PostResponse[] = useFetchPosts(user._id).data?.data;
  const relationship = useGetRelationship(currentUser._id, user._id);

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
        <Profile user={user} relationship={relationship} />
      </section>
      <Timeline posts={profilePosts} setAllPosts={setProfilePosts} />
    </motion.div>
  );
};
export default UserProfile;
