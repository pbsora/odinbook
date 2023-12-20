import NewPost from "./Components/Feed/NewPost";
import Timeline from "./Components/Feed/Timeline";

const Feed = () => {
  return (
    <div className="w-full 2xl:w-[55vw] ">
      <NewPost />
      <Timeline />
    </div>
  );
};
export default Feed;
