import { useContext, useEffect, useState } from "react";
import { AuthData } from "../../../assets/Types & Interfaces";
import { UserContext } from "../../../lib/Context/UserContext";
import { capitalize } from "../../../utils/capitalize";
import UserCard from "./UserCard";
import { debounce } from "lodash";
import Hamburger from "hamburger-react";
import { IoHomeOutline } from "react-icons/io5";
import { FaSignsPost } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { LuMoonStar } from "react-icons/lu";
import { IoIosSunny } from "react-icons/io";
import { useTheme } from "../ui/ThemeProvider";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ open, setOpen }: Props) => {
  const [, user] = useContext(UserContext) as AuthData;
  const [nav, setNav] = useState(false);
  const currTheme = localStorage.getItem("vite-ui-theme");
  const { setTheme } = useTheme();

  const handleScroll = debounce(() => {
    if (window.scrollY > 400) {
      setNav(true);
    } else {
      setNav(false);
    }
  }, 200);

  const handleTheme = () =>
    currTheme === "light" ? setTheme("dark") : setTheme("light");

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <header className="sticky flex justify-center max-w-[100vw] h-20 m-auto z-50 text-zinc-800 dark:text-white">
      <nav className={`${nav ? "full-navbar" : "navbar"} `}>
        <div
          className={`flex justify-center items-center cursor-pointer lg:hidden lg:pointer-events-none hover:scale-110 duration-200`}
          onClick={() => setOpen(!open)}
        >
          <Hamburger toggled={open} toggle={setOpen} />
        </div>
        <div
          className="items-center hidden text-3xl hover:scale-110 dark:text-white md:flex"
          onClick={handleTheme}
        >
          {currTheme === "dark" ? <LuMoonStar /> : <IoIosSunny />}
        </div>
        <div className="items-center justify-center flex-1 hidden gap-12 pl-20 text-3xl lg:flex ">
          <Link
            to={"/"}
            className="transition-all duration-200 hover:scale-125"
          >
            <IoHomeOutline />
          </Link>
          <Link
            to={"/discover"}
            className="transition-all duration-200 hover:scale-125"
          >
            <FaSignsPost />
          </Link>
        </div>
        <div
          className={`relative flex items-center gap-6 pl-12 group ${
            nav && "md:pb-10"
          }`}
        >
          <span className="text-xl select-none">
            {capitalize(user.firstName)}
          </span>
          <img
            src={user.image.url}
            alt="user picture"
            className="h-12 w-12 border-[2px] border-zinc-400 rounded-full cursor-pointer justify-self-end transition-transform duration-200 dark:border-zinc-600"
          />
          <UserCard user={user} nav={nav} />
        </div>
      </nav>
    </header>
  );
};
export default Header;
