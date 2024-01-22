import { CiBookmark } from "react-icons/ci";
import { FaShare } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";

type Props = {
  ownPost: () => boolean;
  handleDelete: () => void;
};
const PostDialog = ({ ownPost, handleDelete }: Props) => {
  const isMobile = () => window.innerWidth >= 768;
  return (
    <div
      className={`
                scale-0 group-hover:scale-100
              min-w-[9rem] divide-y-2 px-6 border border-white w-fit  absolute bg-zinc-100 dark:bg-darkSecondary flex flex-col -translate-x-32 lg:translate-x-0 xl:translate-x-4 transition-all duration-200 ease-out origin-top-right lg:origin-top-left rounded-xl z-30`}
    >
      {ownPost() && isMobile() ? (
        <Dialog>
          <DialogTrigger>
            <div className="flex items-center justify-center gap-2 py-2 text-2xl hover:bg-red-700">
              <MdDeleteOutline />
              <span className="text-2xl text-red-400">Delete</span>
            </div>
          </DialogTrigger>
          <DialogContent>
            <div className="flex flex-col px-6">
              <p>Are you sure you want to delete this post?</p>
              <div
                onClick={handleDelete}
                className="self-end px-6 py-3 text-white bg-red-500 border rounded-xl"
              >
                Delete
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer>
          <DrawerTrigger>
            <div className="flex items-center justify-center gap-2 py-2 text-2xl hover:bg-red-700">
              <MdDeleteOutline />
              <span className="text-2xl text-red-400">Delete</span>
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <div className="h-[30vh] flex flex-col justify-around items-center">
              <h1 className="mt-12 text-base md:text-xl">
                Are you sure you want to delete this post?
              </h1>
              <button
                className="w-2/4 px-6 py-3 m-auto text-white bg-red-500 border rounded-xl"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </DrawerContent>
        </Drawer>
      )}
      <button className="flex items-center justify-center gap-2 py-3 text-2xl">
        <FaShare />
        <span className="text-2xl ">Share</span>
      </button>
      <button className="flex items-center justify-center gap-2 py-2 text-2xl ">
        <CiBookmark />
        <span className="text-2xl ">Save</span>
      </button>
    </div>
  );
};
export default PostDialog;
