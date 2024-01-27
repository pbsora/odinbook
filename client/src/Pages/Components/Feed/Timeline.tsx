import { Fragment } from "react";

import PostItem from "./PostItem";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { RotatingLines } from "react-loader-spinner";
import {
  InfiniteData,
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: InfiniteData<any, unknown> | undefined;
  refetch: (
    options?: RefetchOptions | undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<QueryObserverResult<any, Error>>;
};

const Timeline = ({ refetch, data }: Props) => {
  const [parent] = useAutoAnimate();

  if (!data)
    return (
      <div className="flex justify-center h-screen mt-10 ">
        <RotatingLines strokeColor="blue" width="60" />
      </div>
    );

  const deletePost = () => {
    refetch();
  };

  return (
    <div className="mb-10 lg:rounded-xl" ref={parent}>
      {data?.pages ? (
        data?.pages
          .flatMap((data) => data.data)
          .map((post) => (
            <Fragment key={post._id}>
              <PostItem post={post} deletePost={deletePost} />
            </Fragment>
          ))
      ) : (
        <div className="w-full m-auto text-center">Nothing here yet</div>
      )}
    </div>
  );
};
export default Timeline;
