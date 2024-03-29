import { capitalize } from "../../../utils/capitalize";
import { AuthData, UserType } from "../../../assets/Types & Interfaces";

import { RotatingLines } from "react-loader-spinner";
import { useFollow, useUnfollow } from "../../../lib/Queries/userQueries";
import { UserContext } from "@/lib/Context/UserContext";
import { useContext, useEffect } from "react";
import { toast } from "../ui/use-toast";
import { UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { IoSettings } from "react-icons/io5";
import { Link } from "react-router-dom";

type Props = {
  user: UserType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  relationship?: UseQueryResult<AxiosResponse<any, any>, Error>;
  follow: {
    following: number;
    follower: number;
    postCount: number;
  };
};

const Profile = ({ user, relationship, follow }: Props) => {
  const [, currentUser] = useContext(UserContext) as AuthData;
  const ownProfile = user._id === currentUser._id;
  const following = relationship && relationship?.data?.data;

  const followMutation = useFollow(currentUser._id, user._id);
  const unfollowMutation = useUnfollow(currentUser._id, user._id);

  useEffect(() => {
    if (followMutation.isSuccess) {
      toast({
        title: "Success",
        description: "Followed with success",
      });
      relationship?.refetch();
      followMutation.reset();
    }

    if (unfollowMutation.isSuccess) {
      toast({
        title: "Success",
        description: "Unfollowed with success",
      });
      relationship?.refetch();
      unfollowMutation.reset();
    }
  }, [
    followMutation.isSuccess,
    followMutation.reset,
    unfollowMutation.isSuccess,
    unfollowMutation.reset,
    relationship,
  ]);

  const handleFollow = () =>
    following ? unfollowMutation.mutate() : followMutation.mutate();

  if (!user)
    return (
      <div className="w-screen lg:w-[60vw] h-[55vh] flex  justify-center items-center  border-zinc-400  lg:rounded-xl relative">
        <RotatingLines width="40" strokeColor="blue" />
      </div>
    );

  return (
    <div className="pt-4 w-[95%] md:w-[75%] lg:w-[60%] xl:w-[60%] 2xl:w-[85%] m-auto h-fit flex flex-col justify-around border-b-2 border-zinc-300 lg:border lg:rounded-xl md:mt-6  shadow-xl relative mb-5 bg-zinc-50 dark:bg-darkSecondary dark:border-zinc-700">
      {ownProfile && (
        <Link
          to={"/u/settings"}
          className="absolute text-4xl duration-200 cursor-pointer right-10 top-7 hover:scale-125"
        >
          <IoSettings />
        </Link>
      )}
      <div className="flex flex-col justify-between px-16 mb-10 2xl:flex-row md:mb-0">
        <section className="flex flex-col items-center gap-3 mb-10 md:flex-col md:pl-6">
          {
            <img
              src={user?.image.url}
              alt="User picture"
              className="w-40 h-40 border-2 rounded-full"
            />
          }
          <p className="text-2xl ">{`${capitalize(
            user?.firstName
          )} ${capitalize(user?.lastName)}`}</p>
          <p className="text-lg">@{user.username}</p>
        </section>
        <section className="flex self-center gap-4 text-xl md:mb-28 2xl:mr-16 md:gap-10">
          <div className="duration-200 select-none hover:cursor-pointer hover:text-blue-400">
            <Link
              to={ownProfile ? "/followers" : `/followers?userid=${user._id}`}
              className="flex flex-col items-center"
            >
              <p>Followers</p>
              <span className="text-center">{follow && follow.follower}</span>
            </Link>
          </div>
          <div className="flex flex-col items-center duration-200 select-none hover:cursor-pointer hover:text-blue-400">
            <Link
              to={ownProfile ? "/following" : `/following?userid=${user._id}`}
              className="flex flex-col items-center"
            >
              <p>Following</p>
              <span className="text-center">{follow && follow.following}</span>
            </Link>
          </div>
          <div className="flex flex-col items-center duration-200 select-none ">
            <p>Posts</p>
            <p>{follow && follow.postCount}</p>
          </div>
        </section>
      </div>

      <div className="flex flex-col justify-between gap-6 mb-10 md:items-center md:flex-row md:gap-3 md:mb-10">
        <p className="block w-full px-10 text-lg md:w-full lg:text-xl">
          {user.description}
        </p>
        {!ownProfile && (
          <button
            className={`px-6 py-3 transition-all duration-1000 w-36  mr-6 self-end bg-sky-500 text-white rounded-xl ${
              followMutation.isPending ||
              (unfollowMutation.isPending && "cursor-not-allowed")
            }`}
            onClick={handleFollow}
            disabled={followMutation.isPending || unfollowMutation.isPending}
          >
            {following ? "Following" : "Follow"}
          </button>
        )}
      </div>
    </div>
  );
};
export default Profile;
