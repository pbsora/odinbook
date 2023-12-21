import { PostResponse } from "../assets/Types & Interfaces";
import { useFetchPosts } from "../lib/fetchPosts";
import NewPost from "./Components/Feed/NewPost";
import Timeline from "./Components/Feed/Timeline";

const Feed = () => {
  const posts: PostResponse[] = useFetchPosts().data?.data;

  return (
    <div className="w-full 2xl:w-[55vw] ">
      <NewPost />
      <Timeline posts={posts} />
    </div>
  );
};
export default Feed;
