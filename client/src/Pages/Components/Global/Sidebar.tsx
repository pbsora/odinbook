import { IoHomeOutline, IoSettings } from "react-icons/io5";
import { FaSignsPost } from "react-icons/fa6";
import { Link } from "react-router-dom";

type Props = {
  sidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ sidebar, setSidebar }: Props) => {
  return (
    <section
      className={`fixed top-10 lg:absolute lg:top-[-2rem] ${
        sidebar ? "left-0 blur-0" : "left-[-110vw] blur-lg"
      }  w-screen py-12 px-8 h-screen bg-white gap-8 border-t filter flex flex-col items-center lg:items-baseline z-40 lg:h-[55vh] lg:sticky lg:top-28 lg:blur-none shadow-xl lg:w-[30vw] xl:w-[20vw] lg:border border-zinc-400 lg:rounded-xl transition-all duration-500 ease-in-out`}
    >
      <Link
        to={"/"}
        className="flex items-center gap-4 text-5xl duration-200 cursor-pointer lg:text-4xl hover:text-zinc-500"
        onClick={() => setSidebar(false)}
      >
        <IoHomeOutline />
        <span className="text-4xl font-light lg:text-2xl xl:text-3xl">
          Your feed
        </span>
      </Link>
      <Link
        to={"/posts"}
        className="flex items-center gap-4 text-5xl duration-200 cursor-pointer lg:text-4xl hover:text-zinc-500"
        onClick={() => setSidebar(false)}
      >
        <FaSignsPost />
        <span className="text-4xl font-light lg:text-2xl xl:text-3xl">
          Discover
        </span>
      </Link>
      <Link
        to={"/u/settings"}
        className="flex items-center gap-4 text-5xl duration-200 cursor-pointer lg:text-4xl hover:text-zinc-500"
        onClick={() => setSidebar(false)}
      >
        <IoSettings />
        <span className="text-4xl font-light lg:text-2xl xl:text-3xl">
          Settings
        </span>
      </Link>
    </section>
  );
};
export default Sidebar;
