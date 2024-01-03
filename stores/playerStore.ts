import { create } from "zustand";

interface PlayerStoreState {
  playerName: string;
  setPlayerName: (newName: string) => void;
}

export const playerName = create<PlayerStoreState>()((set) => ({
  playerName: "",
  setPlayerName: (newName: string) => set(() => ({ playerName: newName })),
}));

interface Player {
  name: string;
  color: number;
  position: { x: number; y: number };
  playerState: "notReady" | "ready" | "playing";
  setName: (newName: string) => void;
  setColor: (newColor: number) => void;
  setPosition: (newPosition: { x: number; y: number }) => void;
  setPlayerState: (newPlayerState: "notReady" | "ready" | "playing") => void;
}

export const Player = create<Player>()((set) => ({
  name: "TEMP-NAME",
  color: 0,
  position: { x: 0, y: 0 },
  playerState: "notReady",
  setName: (newName: string) => set(() => ({ name: newName })),
  setColor: (newColor: number) => set(() => ({ color: newColor })),
  setPosition: (newPosition: { x: number; y: number }) =>
    set(() => ({ position: newPosition })),
  setPlayerState: (newPlayerState: "notReady" | "ready" | "playing") =>
    set(() => ({ playerState: newPlayerState })),
}));