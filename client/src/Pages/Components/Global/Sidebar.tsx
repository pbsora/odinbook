type Props = {
  sidebar: boolean;
};

const Sidebar = ({ sidebar }: Props) => {
  return (
    <div
      className={`absolute top-[-2rem] ${
        sidebar ? "left-0" : "left-[-110vw]"
      }  w-screen h-screen  z-50 lg:h-[55vh] lg:sticky lg:top-60  lg:w-[20vw]  border border-blue-500 transition-all duration-150`}
    >
      Sidebar
    </div>
  );
};
export default Sidebar;
