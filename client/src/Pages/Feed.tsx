import { useEffect, useState } from "react";
import { PostResponse } from "../assets/Types & Interfaces";
import { useFetchPosts } from "../lib/PostQueries";
import NewPost from "./Components/Feed/NewPost";
import Timeline from "./Components/Feed/Timeline";
import { useTab } from "./Home";

const Feed = () => {
  const posts: PostResponse[] = useFetchPosts().data?.data;
  const [allPosts, setAllPosts] = useState<PostResponse[] | null>(null);
  const { open } = useTab();
  console.log(posts);

  useEffect(() => {
    posts && setAllPosts(posts);
  }, [posts]);

  return (
    <div className={`w-full 2xl:w-[55vw] ${open && "hidden"} z-[-1000px] `}>
      <NewPost setAllPosts={setAllPosts} />
      <Timeline posts={allPosts} />
    </div>
  );
};
export default Feed;
