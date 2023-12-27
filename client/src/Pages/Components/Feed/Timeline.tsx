import { Fragment } from "react";
import { PostResponse } from "../../../assets/Types & Interfaces";
import PostItem from "./PostItem";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { RotatingLines } from "react-loader-spinner";

type Props = {
  posts: PostResponse[] | null;
  setAllPosts: React.Dispatch<React.SetStateAction<PostResponse[] | null>>;
};

const Timeline = ({ posts, setAllPosts }: Props) => {
  const [parent] = useAutoAnimate();

  if (!posts)
    return (
      <div className="flex justify-center mt-10 border">
        <RotatingLines strokeColor="blue" width="60" />
      </div>
    );

  const deletePost = (post_id: string) => {
    setAllPosts((prev) =>
      prev ? prev?.filter((post) => post._id !== post_id) : []
    );
  };

  return (
    <div className="mb-10 lg:rounded-xl" ref={parent}>
      {posts?.length
        ? posts.map((post) => (
            <Fragment key={post._id}>
              <PostItem post={post} deletePost={deletePost} />
            </Fragment>
          ))
        : "Nothing here yet"}
    </div>
  );
};
export default Timeline;
