const Settings = () => {
  return (
    <div className="w-full 2xl:max-w-[55vw] border-2 rounded-xl pb-28 px-12 flex flex-col gap-12 shadow-xl bg-zinc-50 border-zinc-400 p-6">
      <h1 className="text-4xl">Settings</h1>
      <section className="text-2xl">Profile picture</section>

      <section className="flex flex-col w-3/4 gap-3 p-2">
        <label htmlFor="description" className="block mb-4 text-2xl">
          About me
        </label>
        <textarea
          name="description"
          id=""
          cols={30}
          rows={4}
          className="block w-full p-4 text-xl border-2 resize-none border-zinc-400 focus:outline-sky-400 rounded-xl"
        />
        <button className="self-start px-6 py-3 rounded-lg bg-sky-300">
          Submit
        </button>
      </section>
    </div>
  );
};
export default Settings;
