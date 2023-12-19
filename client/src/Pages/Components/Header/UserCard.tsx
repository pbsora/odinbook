import { UserType } from "../../../assets/Types & Interfaces";
import { capitalize } from "../../../utils/capitalize";

type Props = {
  user: UserType;
};
const UserCard = ({ user }: Props) => {
  return (
    <div className="absolute right-[-20px] flex flex-col items-center gap-1 p-12 border-2 top-[2.6rem] border-zinc-300 rounded-xl scale-0 group-hover:scale-100 transition-all duration-200 origin-top">
      <img
        src={user.image}
        alt="user image"
        className="w-[7rem] rounded-full border-2 border-zinc-400"
      />
      <h2 className="text-2xl">{capitalize(user.firstName)}</h2>
      <span className="text-xl">{user.username}</span>
      <span className="text-xl text-zinc-400">{user.email}</span>
      <button className="px-10 py-2 mt-3 text-lg transition-transform duration-200 bg-red-600 rounded-full hover:scale-110">
        Log-out
      </button>
    </div>
  );
};
export default UserCard;
