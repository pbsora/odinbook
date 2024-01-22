import { MdDeleteOutline } from "react-icons/md";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

type Props = {
  handleDelete: () => void;
};
const deleteModalDesktop = ({ handleDelete }: Props) => {
  return (
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
  );
};
export default deleteModalDesktop;
