import { PostResponse } from "../../../assets/Types & Interfaces";
import PostItem from "./PostItem";
type Props = { posts: PostResponse[] };
const Timeline = ({ posts }: Props) => {
  return (
    <div className="mt-6 lg:border border-zinc-400 h-[1000vh] lg:rounded-xl">
      {posts &&
        posts.map((post, index) => <PostItem post={post} index={index} />)}
    </div>
  );
};
export default Timeline;
