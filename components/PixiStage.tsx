"use client";
import { Stage, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import { RenderRemotePlayers } from "./RenderRemotePlayers";
import { RenderLocalPlayer } from "./RenderLocalPlayer";

type RemotePlayer = {
  id: any;
  name: string;
  position: {
    x: number;
    y: number;
  };
  color: number;
};

type PixiStageProps = {
  playerId: string;
  playerName: string;
  playerColor: number;
  playerPos: { x: number; y: number };
  playerSpeed: { x: number; y: number };
  setPlayerPos: (playerPos: { x: number; y: number }) => void;
  setPlayerSpeed: (playerSpeed: { x: number; y: number }) => void;
  remotePlayers: RemotePlayer[];
  stageWidth: number;
  stageHeight: number;
};

export const PixiStage = (props: PixiStageProps) => {
  const {
    playerId,
    playerName,
    playerColor,
    playerPos,
    playerSpeed,
    setPlayerPos,
    setPlayerSpeed,
    remotePlayers,
    stageWidth,
    stageHeight,
  } = props;

  return (
    <div>
      <Stage
        className="rounded-lg"
        width={stageWidth}
        height={stageHeight}
        options={{ autoDensity: true, backgroundColor: 75306 }}
      >
        <Text
          text="Hello Plupp!"
          anchor={{ x: 0.5, y: 0.5 }}
          x={stageWidth / 2}
          y={150}
          style={
            new PIXI.TextStyle({
              align: "center",
              fontSize: 24,
              fill: ["#ffffff", "#00ff99"],
            })
          }
        />

        <RenderRemotePlayers players={remotePlayers} />
        <RenderLocalPlayer
          id={playerId}
          position={playerPos}
          setPosition={setPlayerPos}
          speed={playerSpeed}
          setSpeed={setPlayerSpeed}
          color={playerColor}
          name={playerName}
          stageWidth={stageWidth}
          stageHeight={stageHeight}
        />
      </Stage>
    </div>
  );
};
