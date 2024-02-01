import { AuthData, FollowingResponse } from "@/assets/Types & Interfaces";
import { UserContext } from "@/lib/Context/UserContext";
import { useGetFollowing } from "@/lib/Queries/userQueries";
import { Fragment, useContext } from "react";
import FollowItem from "./Components/Follow/FollowItem";
import { useSearchParams } from "react-router-dom";

const Following = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("userid");
  const [, user] = useContext(UserContext) as AuthData;
  const followingQuery = useGetFollowing(id ? id : user._id);

  return (
    <div className="w-full min-h-screen border rounded-lg shadow-xl md:w-3/4 lg:w-2/4 bg-neutral-50 dark:bg-darkSecondary md:min-h-fit">
      <h2 className="pt-6 pl-6 mb-6 text-3xl md:pl-12">Following</h2>
      <hr className="w-[90%] m-auto mb-6 border-b border-zinc-400" />
      {followingQuery &&
        followingQuery.data?.data.map(
          (follow: FollowingResponse, index: number) => (
            <Fragment key={follow.following._id}>
              <FollowItem user={follow.following} currentUser={user} />
              {index !== followingQuery.data?.data.length - 1 && (
                <hr className="w-[90%] m-auto mb-6 border-b border-zinc-400" />
              )}
            </Fragment>
          )
        )}
    </div>
  );
};
export default Following;
