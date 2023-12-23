"use client";
import { Dispatch, SetStateAction } from "react";
import Player from "../components/Player";

type PlayerType = {
  id: any;
  name: string;
  position: {
    x: number;
    y: number;
  };
  color: number;
  speed: {
    x: number;
    y: number;
  };
  setPosition: Dispatch<
    SetStateAction<{
      x: number;
      y: number;
    }>
  >;
  setSpeed: Dispatch<
    SetStateAction<{
      x: number;
      y: number;
    }>
  >;
};

export const RenderLocalPlayer = (props: PlayerType) => {
  const { position, speed, color, setPosition, setSpeed } = props;

  return (
    <Player
      position={position}
      setPosition={setPosition}
      speed={speed}
      setSpeed={setSpeed}
      color={color}
    />
  );
};
