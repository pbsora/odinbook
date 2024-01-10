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

  const handleTheme = () => {
    if (currTheme === "light") setTheme("dark");
    else setTheme("light");
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <header className="sticky flex justify-center max-w-[100vw] h-20 m-auto z-50 ">
      <nav
        className={`${
          nav ? "full-navbar" : "navbar"
        } bg-zinc-100 dark:bg-darkSecondary dark:text-zinc-200 border-zinc-400 dark:border-transparent`}
      >
        <div
          className={`text-[2rem]  flex justify-center items-center cursor-pointer lg:hidden lg:pointer-events-none hover:scale-110 duration-200`}
          onClick={() => setOpen(!open)}
        >
          <Hamburger toggled={open} toggle={setOpen} />
        </div>
        <div
          className="items-center hidden text-4xl hover:scale-110 dark:text-white md:flex"
          onClick={handleTheme}
        >
          {currTheme === "dark" ? <LuMoonStar /> : <IoIosSunny />}
        </div>
        <div className="items-center justify-center flex-1 hidden gap-12 pl-20 text-4xl lg:flex ">
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
        <div className="relative flex items-center gap-6 pl-12 pr-3 group">
          <span className="text-2xl select-none">
            {capitalize(user.firstName)}
          </span>
          <img
            src={user.image}
            alt="user picture"
            className="h-12  border-[2px] border-black rounded-full cursor-pointer justify-self-end transition-transform duration-200 dark:border-zinc-600"
          />
          <UserCard user={user} nav={nav} />
        </div>
      </nav>
    </header>
  );
};
export default Header;
