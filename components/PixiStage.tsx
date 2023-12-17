"use client";
import { useState } from "react";
import { Stage, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import ControlButton from "./ControlButton";
import Player from "./Player";

const randomColor = () => {
  return Math.floor(Math.random() * 16777215);
};

export const PixiStage = () => {
  const [playerPos, setPlayerPos] = useState({ x: 200, y: 200 });
  const [playerSpeed, setPlayerSpeed] = useState({ x: 0, y: 0 });
  const [playerColor, setPlayerColor] = useState(randomColor());

  const moveX = (speed: number) => {
    setPlayerSpeed({ x: (playerSpeed.x += speed), y: playerSpeed.y });
  };
  const moveY = (speed: number) => {
    setPlayerSpeed({ x: playerSpeed.x, y: (playerSpeed.y += speed) });
  };
  const resetPlayerPos = () => {
    setPlayerPos({ x: 200, y: 200 });
    setPlayerSpeed({ x: 0, y: 0 });
  };

  return (
    <div>
      <Stage
        className="rounded-lg"
        width={400}
        height={400}
        options={{ autoDensity: true, backgroundColor: 0x01262a }}
      >
        <Text
          text="Hello Plupp!"
          anchor={{ x: 0.5, y: 0.5 }}
          x={200}
          y={150}
          style={
            new PIXI.TextStyle({
              align: "center",
              fontSize: 24,
              fill: ["#ffffff", "#00ff99"],
            })
          }
        />
        <Player
          position={playerPos}
          setPosition={setPlayerPos}
          speed={playerSpeed}
          setSpeed={setPlayerSpeed}
          color={playerColor}
        />
      </Stage>
      <div className="flex flex-col w-full justify-center items-center">
        <div className="flex flex-row mt-5">
          <div className="flex flex-col">
            <ControlButton name="Up" speed={-1} onClick={moveY} />
            <ControlButton name="Down" speed={1} onClick={moveY} />
          </div>
          <div className="flex flex-col">
            <ControlButton name="Right" speed={1} onClick={moveX} />
            <ControlButton name="Left" speed={-1} onClick={moveX} />
          </div>
        </div>

        <ControlButton
          name="Reset"
          speed={0}
          onClick={resetPlayerPos}
          color="red"
        />
      </div>

      <p>Player X = {playerPos.x}</p>
      <p>Player Y = {playerPos.y}</p>
    </div>
  );
};
