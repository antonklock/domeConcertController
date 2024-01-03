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
  id: string;
  name: string;
  color: number;
  position: { x: number; y: number };
  speed: { x: number; y: number };
  status: "notReady" | "ready" | "playing";
  setId: (newId: string) => void;
  setName: (newName: string) => void;
  setColor: (newColor: number) => void;
  setPosition: (newPosition: { x: number; y: number }) => void;
  setSpeed: (newSpeed: { x: number; y: number }) => void;
  setStatus: (newPlayerState: "notReady" | "ready" | "playing") => void;
}

export const Player = create<Player>()((set) => ({
  id: "TEMP-ID",
  name: "TEMP-NAME",
  color: 0,
  position: { x: 0, y: 0 },
  speed: { x: 0, y: 0 },
  status: "notReady",
  setId: (newId: string) => set(() => ({ id: newId })),
  setName: (newName: string) => set(() => ({ name: newName })),
  setColor: (newColor: number) => set(() => ({ color: newColor })),
  setPosition: (newPosition: { x: number; y: number }) =>
    set(() => ({ position: newPosition })),
  setSpeed: (newSpeed: { x: number; y: number }) =>
    set(() => ({ speed: newSpeed })),
  setStatus: (newPlayerState: "notReady" | "ready" | "playing") =>
    set(() => ({ status: newPlayerState })),
}));