import { IoIosArrowUp } from "react-icons/io";

const ToTopButton = () => {
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <button
        onClick={handleScroll}
        className="fixed p-5 text-2xl border-2 rounded-full right-3 bottom-3 md:right-10 md:bottom-10 bg-neutral-50 dark:bg-darkSecondary dark:border-white/50 border-zinc-700/50"
      >
        <IoIosArrowUp />
      </button>
    </div>
  );
};
export default ToTopButton;
