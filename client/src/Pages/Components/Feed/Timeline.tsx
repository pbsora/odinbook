import { Fragment } from "react";
import { PostResponse } from "../../../assets/Types & Interfaces";
import PostItem from "./PostItem";
type Props = { posts: PostResponse[] };
const Timeline = ({ posts }: Props) => {
  return (
    <div className="mt-6  h-[1000vh] lg:rounded-xl">
      {posts &&
        posts.map((post) => (
          <Fragment key={post._id}>
            <PostItem post={post} />
          </Fragment>
        ))}
    </div>
  );
};
export default Timeline;
