import { capitalize } from "../../../utils/capitalize";
import { UserType } from "../../../assets/Types & Interfaces";
import { CiEdit } from "react-icons/ci";
import { DateTime } from "ts-luxon";
import { RotatingLines } from "react-loader-spinner";

type Props = {
  user: UserType;
};

const Profile = ({ user }: Props) => {
  if (!user)
    return (
      <div className="w-screen lg:w-[60vw] h-[55vh] flex  justify-center items-center border-b-2 border-zinc-400 lg:border lg:rounded-xl  relative">
        <RotatingLines width="40" strokeColor="blue" />
      </div>
    );

  return (
    <div className="w-full h-[55vh] flex flex-col justify-around border-b-2 border-zinc-400 lg:border lg:rounded-xl  relative">
      <div className="absolute text-4xl duration-200 cursor-pointer right-10 top-7 hover:scale-125">
        <CiEdit />
      </div>
      <section className="flex flex-col items-center gap-3">
        <figure>
          <img
            src={user?.image}
            alt="User picture"
            className="h-32 border-2 rounded-full"
          />
          <figcaption className="text-2xl text-center">{`${capitalize(
            user?.firstName
          )} ${capitalize(user?.lastName)}`}</figcaption>
        </figure>
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
        <div className="flex justify-end w-2/4 pr-10">
          <button className="px-6 bg-sky-500 rounded-xl">Follow</button>
        </div>
      </div>
    </div>
  );
};
export default Profile;
