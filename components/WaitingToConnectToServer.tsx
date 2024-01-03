import { Player } from "@/stores/playerStore";

type WaitingToConnectToServerProps = {
  setPlayerState: (state: "ready" | "notReady") => void;
};

export const WaitingToConnectToServer = (
  props: WaitingToConnectToServerProps
) => {
  const { setPlayerState } = props;
  // const player = Player();
  const zPlayerState = Player((state) => state.playerState);
  const zSetPlayerState = Player((state) => state.setPlayerState);
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-red-500">Waiting for server to start session...</h1>
      <button
        className="bg-blue-200 w-20 rounded-md p-2 m-2"
        onClick={() => {
          zSetPlayerState("notReady");
          console.log(zPlayerState);
        }}
      >
        Back
      </button>
    </div>
  );
};
