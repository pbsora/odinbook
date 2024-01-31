import { UserType } from "@/assets/Types & Interfaces";
import { useUnfollow } from "@/lib/Queries/userQueries";
import { Link } from "react-router-dom";
import { toast } from "../ui/use-toast";
import { capitalize } from "@/utils/capitalize";
import { useEffect } from "react";

type Props = {
  user: {
    firstName: string;
    lastName: string;
    username: string;
    _id: string;
    image: { url: string; id: string };
  };
  currentUser: UserType;
};

const FollowItem = ({ user, currentUser }: Props) => {
  const unfollowMutation = useUnfollow(currentUser._id, user._id);

  useEffect(() => {
    if (unfollowMutation.isSuccess) {
      toast({
        title: "Unfollowed with success",
      });
    }
  }, [unfollowMutation.isSuccess]);

  const handleUnfollow = () => {
    unfollowMutation.mutate();
  };
  return (
    <div className="flex items-center px-3 py-6 border-b md:px-12 bg-darkSecondary border-zinc-700">
      <div className="flex items-center flex-1 gap-3">
        <img
          src={user.image.url}
          alt="user picture"
          className="w-16 rounded-full"
        />
        <Link to={`/u/${user.username}`} className="text-lg">
          {capitalize(user.firstName) + " " + capitalize(user.lastName)}
        </Link>
      </div>

      <button
        className={` py-3 transition-all duration-1000 w-24  mr-6 bg-sky-500 rounded-xl ${
          unfollowMutation.isPending && "cursor-not-allowed"
        }`}
        onClick={handleUnfollow}
        disabled={unfollowMutation.isPending}
      >
        Unfollow
      </button>
    </div>
  );
};
export default FollowItem;
