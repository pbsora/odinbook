import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../lib/Context/UserContext";
import { AuthData, PostResponse } from "../assets/Types & Interfaces";
import Profile from "./Components/Profile/Profile";
import Timeline from "./Components/Feed/Timeline";
import { useFetchPosts } from "../lib/Queries";

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
    <div className=" w-full 2xl:w-[55vw]">
      <section ref={profileRef}>
        <Profile user={user} />
      </section>
      <Timeline posts={profilePosts} setAllPosts={setProfilePosts} />
    </div>
  );
};
export default OwnProfile;
