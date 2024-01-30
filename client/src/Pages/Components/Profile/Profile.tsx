import { capitalize } from "../../../utils/capitalize";
import { AuthData, UserType } from "../../../assets/Types & Interfaces";
import { DateTime } from "ts-luxon";
import { RotatingLines } from "react-loader-spinner";
import { useFollow, useUnfollow } from "../../../lib/Queries/userQueries";
import { UserContext } from "@/lib/Context/UserContext";
import { useContext } from "react";
import { toast } from "../ui/use-toast";
import { UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { IoSettings } from "react-icons/io5";
import { Link } from "react-router-dom";

type Props = {
  user: UserType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  relationship?: UseQueryResult<AxiosResponse<any, any>, Error>;
};

const Profile = ({ user, relationship }: Props) => {
  const [, currentUser] = useContext(UserContext) as AuthData;
  const ownProfile = user._id === currentUser._id;
  const following = relationship && relationship?.data?.data;

  const followMutation = useFollow(currentUser._id, user._id);
  const unfollowMutation = useUnfollow(currentUser._id, user._id);

  const handleFollow = () => {
    if (following) {
      unfollowMutation.mutate();
      toast({
        title: "Success",
        description: "Unfollowed with success",
      });
      setTimeout(() => {
        relationship.refetch();
      }, 1000);
    } else {
      followMutation.mutate();
      toast({
        title: "Success",
        description: "Followed with success",
      });
      setTimeout(() => {
        relationship?.refetch();
      }, 1000);
    }
  };

  if (!user)
    return (
      <div className="w-screen lg:w-[60vw] h-[55vh] flex  justify-center items-center  border-zinc-400  lg:rounded-xl relative">
        <RotatingLines width="40" strokeColor="blue" />
      </div>
    );

  return (
    <div className=" w-[95%] md:w-[75%] lg:w-[60%] xl:w-[60%] 2xl:w-[85%] m-auto h-[55vh] flex flex-col justify-around border-b-2 border-zinc-300 lg:border lg:rounded-xl md:mt-6  shadow-xl relative mb-5 bg-zinc-50 dark:bg-darkSecondary dark:border-zinc-700">
      {ownProfile && (
        <Link
          to={"/u/settings"}
          className="absolute text-4xl duration-200 cursor-pointer right-10 top-7 hover:scale-125"
        >
          <IoSettings />
        </Link>
      )}
      <section className="flex flex-col items-center gap-3">
        {
          <img
            src={user?.image.url}
            alt="User picture"
            className="w-40 h-40 border-2 rounded-full"
          />
        }
        <figcaption className="text-2xl text-center">{`${capitalize(
          user?.firstName
        )} ${capitalize(user?.lastName)}`}</figcaption>

        <p className="w-2/4 mt-6 text-center">{user.description}</p>
      </section>
      <div className="flex">
        <div className="flex flex-col flex-1 w-2/4 gap-3 pl-10 text-xl justify-self">
          <p>Followers: {user.followers}</p>
          <p>
            Joined on:{"\t"}
            {user &&
              DateTime.fromJSDate(
                typeof user.createdAt === "string"
                  ? new Date(user.createdAt)
                  : user.createdAt
              ).toLocaleString(DateTime.DATE_SHORT)}
          </p>
        </div>
        {!ownProfile && (
          <div className="flex items-center pr-10 ">
            <button
              className={`px-6 py-3 transition-all duration-1000  bg-sky-500 rounded-xl ${
                followMutation.isPending ||
                (unfollowMutation.isPending && "cursor-not-allowed")
              }`}
              onClick={handleFollow}
              disabled={followMutation.isPending || unfollowMutation.isPending}
            >
              {following ? "Following" : "Follow"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Profile;
