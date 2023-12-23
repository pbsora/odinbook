import { capitalize } from "../../../utils/capitalize";
import { UserType } from "../../../assets/Types & Interfaces";
import { CiEdit } from "react-icons/ci";
import { DateTime } from "ts-luxon";

type Props = {
  user?: UserType;
};

const Profile = ({ user }: Props) => {
  console.log(user);
  return (
    <div className="w-full h-[55vh] flex flex-col justify-around  relative">
      <div className="absolute text-4xl duration-200 cursor-pointer right-10 top-7 hover:scale-125">
        <CiEdit />
      </div>
      <section className="flex flex-col items-center gap-3">
        <img
          src={user?.image}
          alt="User picture"
          className="h-32 border-2 rounded-full"
        />
        <span className="text-2xl">{`${capitalize(
          user?.firstName
        )} ${capitalize(user?.lastName)}`}</span>
      </section>
      <div className="w-full pl-10 text-xl justify-self-start">
        <p>
          Joined on:{" "}
          <span>
            {user &&
              DateTime.fromJSDate(
                typeof user.createdAt === "string"
                  ? new Date(user.createdAt)
                  : user.createdAt
              ).toLocaleString(DateTime.DATE_SHORT)}
          </span>
        </p>
      </div>
    </div>
  );
};
export default Profile;
