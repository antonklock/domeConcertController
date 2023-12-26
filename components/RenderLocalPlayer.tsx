"use client";
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
  setPosition: (position: { x: number; y: number }) => void;
  setSpeed: (speed: { x: number; y: number }) => void;
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
