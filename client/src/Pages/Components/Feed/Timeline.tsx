import { Fragment } from "react";
import { PostResponse } from "../../../assets/Types & Interfaces";
import PostItem from "./PostItem";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type Props = { posts: PostResponse[] | null };

const Timeline = ({ posts }: Props) => {
  const [parent] = useAutoAnimate();

  return (
    <div className="mb-10 lg:rounded-xl" ref={parent}>
      {posts?.length
        ? posts.map((post) => (
            <Fragment key={post._id}>
              <PostItem post={post} />
            </Fragment>
          ))
        : "Nothing here yet"}
    </div>
  );
};
export default Timeline;
