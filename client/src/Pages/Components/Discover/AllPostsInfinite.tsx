import {
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { useInView } from "framer-motion";
import { debounce } from "lodash";
import { useEffect, useRef } from "react";

type Props = {
  nextPage: () => Promise<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    InfiniteQueryObserverResult<InfiniteData<any, unknown>, Error>
  >;
};
const AllPostsInfinite = ({ nextPage }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    const fetchNextPage = debounce(() => {
      nextPage();
    }, 200);

    if (isInView) {
      fetchNextPage();
    }
    return () => {
      fetchNextPage.cancel();
    };
  }, [isInView, nextPage]);

  return (
    <>
      <div ref={ref} className="flex items-center w-full mb-20 "></div>
    </>
  );
};
export default AllPostsInfinite;
