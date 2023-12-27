import Profile from "./Components/Profile/Profile";
import { useLoaderData } from "react-router-dom";
import { useFetchPosts } from "../lib/Queries";
import { PostResponse, UserType } from "../assets/Types & Interfaces";
import Timeline from "./Components/Feed/Timeline";
import { useEffect, useRef, useState } from "react";

const UserProfile = () => {
  const [profilePosts, setProfilePosts] = useState<PostResponse[] | null>(null);
  const user = useLoaderData() as UserType;
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
    <div>
      <section ref={profileRef}>
        <Profile user={user} />
      </section>
      <Timeline posts={profilePosts} setAllPosts={setProfilePosts} />
    </div>
  );
};
export default UserProfile;
