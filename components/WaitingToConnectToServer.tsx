import { Player } from "@/stores/playerStore";

export const WaitingToConnectToServer = () => {
  const zSetPlayerStatus = Player((state) => state.setStatus);
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-red-500">Waiting on server to start session...</h1>
      <button
        className="bg-blue-200 w-20 rounded-md p-2 m-2"
        onClick={() => zSetPlayerStatus("notReady")}
      >
        Back
      </button>
    </div>
  );
};
