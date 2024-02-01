import { Link } from "react-router-dom";
import not_found from "../assets/not_found.svg";

const NotFound = () => {
  return (
    <div className="grid w-screen h-screen px-5 text-6xl text-center place-content-center bg-slate-100 dark:bg-darkPrimary dark:text-white">
      <img src={not_found} alt="" />
      <h1>Page not found</h1>
      <Link
        to={"/"}
        className="mt-10 text-3xl border-b-2 border-black md:text-4xl dark:border-white"
      >
        Click here to return to homepage
      </Link>
    </div>
  );
};
export default NotFound;
