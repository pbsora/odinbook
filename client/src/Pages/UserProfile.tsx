import Profile from "./Components/Profile/Profile";
import { useLoaderData } from "react-router-dom";
import { useFetchPosts } from "../lib/Queries";
import { PostResponse, UserType } from "../assets/Types & Interfaces";
import Timeline from "./Components/Feed/Timeline";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const [profilePosts, setProfilePosts] = useState<PostResponse[] | null>(null);
  const user = useLoaderData() as UserType;
  const posts: PostResponse[] = useFetchPosts(user._id).data?.data;

  useEffect(() => {
    if (posts) setProfilePosts(posts);
  }, [posts]);

  //TODO: Add loading state and error state

  return (
    <div>
      <Profile user={user} />
      <Timeline posts={profilePosts} />
    </div>
  );
};
export default UserProfile;
