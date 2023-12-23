import { Fragment } from "react";
import { PostResponse } from "../../../assets/Types & Interfaces";
import PostItem from "./PostItem";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type Props = { posts: PostResponse[] | null };

const Timeline = ({ posts }: Props) => {
  const [parent] = useAutoAnimate();

  return (
    <div className="mt-6 mb-10 lg:rounded-xl" ref={parent}>
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
