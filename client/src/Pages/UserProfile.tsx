import Profile from "./Components/Profile/Profile";
import { useParams } from "react-router-dom";
import { useGetUser } from "../lib/Queries";

const UserProfile = () => {
  const { user_id } = useParams();
  const user = useGetUser(user_id || "");
  console.log(user_id);

  console.log(user.data?.data);
  console.log(user.isLoading);

  //TODO: Add loading state and error state

  return (
    <div>
      <Profile user={user.data?.data} />
    </div>
  );
};
export default UserProfile;
