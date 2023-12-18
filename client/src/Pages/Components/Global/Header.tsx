import { useContext, useEffect, useState } from "react";
import { AuthData } from "../../../assets/Types & Interfaces";
import { UserContext } from "../../../lib/Context/UserContext";
import { capitalize } from "../../../utils/capitalize";
import { RxHamburgerMenu } from "react-icons/rx";
import UserCard from "./UserCard";
import { debounce } from "lodash";

const Header = () => {
  const [logged, user] = useContext(UserContext) as AuthData;
  const [nav, setNav] = useState(false);

  const handleScroll = debounce(() => {
    console.log(window.scrollY);
    if (window.scrollY > 600) {
      setNav(true);
    } else {
      console.log("rerender");
      setNav(false);
    }
  }, 200);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="sticky flex justify-center w-screen h-20 ">
      <nav className={nav ? "full-navbar" : "navbar"}>
        <div className="text-[2rem] flex justify-center items-center cursor-pointer hover:scale-125 duration-200">
          <RxHamburgerMenu />
        </div>
        <div className="relative flex items-center h-full gap-6 group">
          <span className="text-2xl select-none">
            {capitalize(user.firstName)}
          </span>
          <img
            src={user.image}
            alt="user picture"
            className="h-12  border-[2px] border-black rounded-full cursor-pointer justify-self-end transition-transform duration-200"
          />
          <UserCard user={user} />
        </div>
      </nav>
    </div>
  );
};
export default Header;
