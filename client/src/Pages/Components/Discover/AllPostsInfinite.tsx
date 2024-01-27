import {
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";

type Props = {
  nextPage: () => Promise<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    InfiniteQueryObserverResult<InfiniteData<any, unknown>, Error>
  >;
};
const AllPostsInfinite = ({ nextPage }: Props) => {
  return (
    <>
      <div
        className="flex items-center w-full mb-20 "
        onClick={() => nextPage()}
      >
        <button className="m-auto border bg-zinc-400">Fetch more posts</button>
      </div>
    </>
  );
};
export default AllPostsInfinite;
