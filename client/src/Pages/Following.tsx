import { AuthData, FollowingResponse } from "@/assets/Types & Interfaces";
import { UserContext } from "@/lib/Context/UserContext";
import { useGetFollowing } from "@/lib/Queries/userQueries";
import { Fragment, useContext } from "react";
import FollowItem from "./Components/Follow/FollowItem";

const Following = () => {
  const [, user] = useContext(UserContext) as AuthData;
  const followingQuery = useGetFollowing(user._id);

  return (
    <div className="w-full border rounded-lg md:w-3/4 lg:w-2/4 bg-darkSecondary h-fit">
      <h2 className="pt-6 pl-6 mb-6 text-3xl md:pl-12">Following</h2>
      <hr className="w-[90%] m-auto mb-6 border-b border-zinc-700" />
      {followingQuery &&
        followingQuery.data?.data.map((follow: FollowingResponse) => (
          <Fragment key={follow.following._id}>
            <FollowItem user={follow.following} currentUser={user} />
          </Fragment>
        ))}
    </div>
  );
};
export default Following;
