"use client";
import { useEffect, useState } from "react";
import { Stage, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import ControlButton from "./ControlButton";
import { RenderRemotePlayers } from "./RenderRemotePlayers";
import { RenderLocalPlayer } from "./RenderLocalPlayer";
import getRandomColor from "../utils/getRandomColor";

import { socket } from "../socket";

type Players = {
  id: any;
  name: string;
  position: {
    x: number;
    y: number;
  };
  color: number;
}[];

export const PixiStage = () => {
  //TODO: MAKE CONNECTION MANAGER
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }

    function updatePlayerPos(players: any) {
      setRemotePlayers(players);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("updatePlayerPositions", updatePlayerPos);
  }, []);

  const [remotePlayers, setRemotePlayers] = useState<Players>([]);

  const [isConnected, setIsConnected] = useState(false);

  //TODO: REFACTOR
  const [playerId, setPlayerId] = useState("TEMP-ID");
  const [playerName, setPlayerName] = useState("TEMP-NAME");
  //#TODO

  const [playerPos, setPlayerPos] = useState({ x: 200, y: 200 });
  const [playerSpeed, setPlayerSpeed] = useState({ x: 0, y: 0 });
  const [playerColor, setPlayerColor] = useState(getRandomColor());

  const moveX = (speed: number) => {
    setPlayerSpeed({ x: (playerSpeed.x += speed), y: playerSpeed.y });
    console.log(playerSpeed);
  };
  const moveY = (speed: number) => {
    setPlayerSpeed({ x: playerSpeed.x, y: (playerSpeed.y += speed) });
    console.log(playerSpeed);
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

        {/* PLAYERS */}
        <RenderRemotePlayers players={remotePlayers} />
        <RenderLocalPlayer
          id={playerId}
          position={playerPos}
          setPosition={setPlayerPos}
          speed={playerSpeed}
          setSpeed={setPlayerSpeed}
          color={playerColor}
          name={playerName}
        />
      </Stage>

      <div className="flex flex-col w-full justify-center items-center">
        <div className="flex flex-col mt-5 items-center">
          <div className="flex flex-col">
            <ControlButton name="Up" speed={-1} onClick={moveY} />
          </div>
          <div className="flex flex-row">
            <ControlButton name="Left" speed={-1} onClick={moveX} />
            <ControlButton name="Down" speed={1} onClick={moveY} />
            <ControlButton name="Right" speed={1} onClick={moveX} />
          </div>
        </div>

        <ControlButton
          name="Reset"
          speed={0}
          onClick={resetPlayerPos}
          color="red"
        />
      </div>

      <div className="flex flex-row justify-center mt-10">
        <div className="flex flex-col text-white">
          <p>Player X = {playerPos.x}</p>
          <p>Player Y = {playerPos.y}</p>
        </div>
      </div>
      <div className="flex flex-row justify-center mt-10">
        {isConnected ? (
          <div className="flex flex-col text-green-500">
            <p>Socket connected</p>
          </div>
        ) : (
          <div className="flex flex-col text-red-500">
            <p>Not connected to socket</p>
          </div>
        )}
      </div>
    </div>
  );
};
