import { useContext, useEffect, useState } from "react";
import { AuthData } from "../../../assets/Types & Interfaces";
import { UserContext } from "../../../lib/Context/UserContext";
import { capitalize } from "../../../utils/capitalize";
import UserCard from "./UserCard";
import { debounce } from "lodash";
import Hamburger from "hamburger-react";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ open, setOpen }: Props) => {
  const [, user] = useContext(UserContext) as AuthData;
  const [nav, setNav] = useState(false);

  const handleScroll = debounce(() => {
    if (window.scrollY > 600) {
      setNav(true);
    } else {
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
    <header className="sticky flex justify-center max-w-[100vw] h-20 m-auto z-50">
      <nav className={nav ? "full-navbar" : "navbar"}>
        <div
          className="text-[2rem] flex justify-center items-center cursor-pointer lg:opacity-0 lg:pointer-events-none hover:scale-125 duration-200 text-zinc-400"
          onClick={() => setOpen(!open)}
        >
          <Hamburger toggled={open} toggle={setOpen} />
        </div>
        <div className="relative flex items-center gap-6 pl-12 pr-3 group">
          <span className="text-2xl select-none">
            {capitalize(user.firstName)}
          </span>
          <img
            src={user.image}
            alt="user picture"
            className="h-12  border-[2px] border-black rounded-full cursor-pointer justify-self-end transition-transform duration-200"
          />
          <UserCard user={user} nav={nav} />
        </div>
      </nav>
    </header>
  );
};
export default Header;
