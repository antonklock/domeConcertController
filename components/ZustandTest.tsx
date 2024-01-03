import { create } from "zustand";
import { playerName } from "../stores/playerNameStore";

interface PlayerStoreState {
  playerName: string;
  setPlayerName: (name: string) => void;
}

export const ZustandTest = () => {
  const zPlayerName = playerName((state) => state.playerName);
  const setPlayerName = playerName((state) => state.setPlayerName);
  return (
    <>
      <p className="text-red-400">Player name</p>
      <p className="text-red-600">{zPlayerName}</p>
      <input
        type="text"
        onChange={(e) => {
          console.log("On change");
          console.log("e.target.value: ", e.target.value);
          setPlayerName(e.target.value);
        }}
      ></input>
    </>
  );
};
