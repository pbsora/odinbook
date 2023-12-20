import { PostResponse } from "../../../assets/Types & Interfaces";
type Props = { posts: PostResponse[] };
const Timeline = ({ posts }: Props) => {
  return (
    <div className="mt-6 lg:border border-zinc-400 h-[1000vh] lg:rounded-xl">
      {posts && posts.map((post) => <div>{post.content}</div>)}
    </div>
  );
};
export default Timeline;
