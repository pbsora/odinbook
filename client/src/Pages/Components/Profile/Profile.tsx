import { capitalize } from "../../../utils/capitalize";
import { AuthData, UserType } from "../../../assets/Types & Interfaces";
import { CiEdit } from "react-icons/ci";
import { DateTime } from "ts-luxon";
import { RotatingLines } from "react-loader-spinner";
import { useFollow, useUnfollow } from "../../../lib/Queries/userQueries";
import { UserContext } from "@/lib/Context/UserContext";
import { useContext } from "react";
import { toast } from "../ui/use-toast";
import { UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

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
    <div className="w-full h-[55vh] flex flex-col justify-around border-b-2 border-zinc-400 lg:border lg:rounded-xl  shadow-xl relative">
      {ownProfile && (
        <div className="absolute text-4xl duration-200 cursor-pointer right-10 top-7 hover:scale-125">
          <CiEdit />
        </div>
      )}
      <section className="flex flex-col items-center gap-3">
        <img
          src={user?.image}
          alt="User picture"
          className="h-32 border-2 rounded-full"
        />
        <figcaption className="text-2xl text-center">{`${capitalize(
          user?.firstName
        )} ${capitalize(user?.lastName)}`}</figcaption>

        <p className="w-2/4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic dolor
          dicta non nobis error a quisquam quidem voluptas. Nam magni itaque in
          aliquid deleniti dolor temporibus dolores, non facere officiis.
        </p>
      </section>
      <div className="flex">
        <div className="flex flex-col w-2/4 gap-3 pl-10 text-xl justify-self">
          <p>Followers: 6969</p>
          <p>
            Joined on:{""}
            {user &&
              DateTime.fromJSDate(
                typeof user.createdAt === "string"
                  ? new Date(user.createdAt)
                  : user.createdAt
              ).toLocaleString(DateTime.DATE_SHORT)}
          </p>
        </div>
        {!ownProfile && (
          <div className="flex justify-end w-2/4 pr-10">
            <button
              className={`px-6 transition-all duration-1000 bg-sky-500 rounded-xl ${
                followMutation.isPending ||
                (unfollowMutation.isPending && "cursor-not-allowed")
              }`}
              onClick={handleFollow}
              disabled={followMutation.isPending || unfollowMutation.isPending}
            >
              {following ? "Already following" : "Follow"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Profile;
