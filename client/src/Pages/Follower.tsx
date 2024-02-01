import { AuthData, FollowerResponse } from "@/assets/Types & Interfaces";
import { UserContext } from "@/lib/Context/UserContext";
import { useGetFollower } from "@/lib/Queries/userQueries";
import { Fragment, useContext } from "react";
import FollowItem from "./Components/Follow/FollowItem";
import { useSearchParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

const Follower = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("userid");
  const [, user] = useContext(UserContext) as AuthData;
  const followerQuery = useGetFollower(id ? id : user._id);

  if (!followerQuery.data?.data) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen border rounded-lg shadow-xl md:w-3/4 lg:w-2/4 bg-neutral-50 dark:bg-darkSecondary md:min-h-fit">
        <RotatingLines width="48" strokeColor="blue" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen border rounded-lg shadow-xl md:w-3/4 lg:w-2/4 bg-neutral-50 dark:bg-darkSecondary md:min-h-fit">
      <h2 className="pt-6 pl-6 mb-6 text-3xl md:pl-12">Followers</h2>
      <hr className="w-[90%] m-auto mb-6 border-b border-zinc-400" />
      {followerQuery &&
        followerQuery.data?.data.map(
          (follow: FollowerResponse, index: number) => (
            <Fragment key={follow.follower._id}>
              <FollowItem user={follow.follower} currentUser={user} />
              {index !== followerQuery.data?.data.length - 1 && (
                <hr className="w-[90%] m-auto mb-6 border-b border-zinc-400" />
              )}
            </Fragment>
          )
        )}
    </div>
  );
};
export default Follower;
