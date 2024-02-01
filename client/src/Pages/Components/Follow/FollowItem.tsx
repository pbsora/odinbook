import { UserType } from "@/assets/Types & Interfaces";
import { useUnfollow } from "@/lib/Queries/userQueries";
import { Link } from "react-router-dom";
import { toast } from "../ui/use-toast";
import { capitalize } from "@/utils/capitalize";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const ownProfile = user._id === currentUser._id;

  const navigate = useNavigate();

  useEffect(() => {
    if (unfollowMutation.isSuccess) {
      toast({
        title: "Unfollowed with success",
      });
    }
  }, [unfollowMutation.isSuccess]);

  return (
    <div className="flex items-center px-3 py-6 md:px-12 border-zinc-700">
      <div className="flex items-center flex-1 gap-3">
        <img
          src={user.image.url}
          alt="user picture"
          className="w-16 rounded-full hover:cursor-pointer"
          onClick={() =>
            ownProfile
              ? navigate("/u/profile")
              : navigate(`/u/${user.username}`)
          }
        />
        <Link to={`/u/${user.username}`} className="text-lg">
          {capitalize(user.firstName) + " " + capitalize(user.lastName)}
        </Link>
      </div>

      {!ownProfile && (
        <Link
          to={`/u/${user.username}`}
          className="px-6 py-3 text-white duration-200 bg-blue-400 rounded-2xl hover:scale-110"
        >
          Profile
        </Link>
      )}
    </div>
  );
};
export default FollowItem;
