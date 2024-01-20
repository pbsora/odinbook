import { UserType } from "../../../assets/Types & Interfaces";
import { capitalize } from "../../../utils/capitalize";
import { API } from "../../../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

type Props = {
  user: UserType;
  nav: boolean;
};
const UserCard = ({ user, nav }: Props) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const { status } = await API.post("/auth/log-out");
    if (status !== 200) return;
    navigate("/auth");
  };

  return (
    <div
      className={` ${
        nav ? "lg:top-[2.4rem]" : "lg:top-[4rem] "
      } absolute right-[-20px] flex flex-col items-center min-w-[20rem] gap-1 p-4 lg:p-12 border-2 top-[4rem] border-zinc-300 rounded-xl scale-0 bg-zinc-50 dark:bg-darkSecondary dark:border-zinc-700 group-hover:scale-100 transition-all duration-200 origin-top`}
    >
      <img
        src={user.image}
        alt="user image"
        className="w-[7rem] rounded-full border-2 border-zinc-400"
      />
      <Link to={"/u/profile"}>
        {" "}
        <h2 className="text-2xl">{capitalize(user.firstName)}</h2>
      </Link>
      <span className="text-xl">{user.username}</span>
      <span className="text-xl text-zinc-400">{user.email}</span>
      <button
        className="flex items-center gap-1 px-6 py-2 mt-3 text-lg transition-transform duration-200 bg-red-600 rounded-full hover:scale-110"
        onClick={handleLogout}
      >
        <BiLogOut />
        Log-out
      </button>
    </div>
  );
};
export default UserCard;
