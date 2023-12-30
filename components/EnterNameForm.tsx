import { socket } from "../socket";

type PreGameFormProps = {
  setPlayerState: (state: "ready" | "notReady") => void;
  setPlayerName: (name: string) => void;
  player: {
    id: string;
    name: string;
    color: number;
  };
};

export const EnterNameForm = (props: PreGameFormProps) => {
  const { setPlayerState, setPlayerName, player } = props;

  const handleUpdateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (input.length < 3 || input.length > 16) return;
    setPlayerName(e.target.value);
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
          // value={playerName}
        />
        <button
          className="bg-blue-200 rounded-md p-2 m-2"
          onClick={() => {
            setPlayerState("ready");
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
