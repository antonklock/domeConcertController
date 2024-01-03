import { Player } from "@/stores/playerStore";

export const EnterNameForm = () => {
  const setName = Player((state) => state.setName);
  const setStatus = Player((state) => state.setStatus);

  const handleUpdateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (input.length < 3 || input.length > 16) return;

    setName(input);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-red-500">Enter player name</h1>
      <div>
        <input
          className="rounded-md py-2"
          placeholder="Player name"
          type="text"
          onChange={(e) => handleUpdateName(e)}
        />
        <button
          className="bg-blue-200 rounded-md p-2 m-2"
          onClick={() => {
            setStatus("ready");
            //TODO: FIX THIS
            // socket.emit("updateLocalPlayerInfo", player);
          }}
        >
          Ready
        </button>
      </div>
    </div>
  );
};
