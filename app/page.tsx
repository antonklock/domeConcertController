"use client";

import { useState } from "react";
import { PixiStage } from "@/components/PixiStage";
import { MovementController } from "@/components/MovementController";
import { ConnectSocketButton } from "@/components/ConnectSocketButton";
import getRandomColor from "@/utils/getRandomColor";
import {
  closeSocketIo,
  startSocketIo,
} from "../utils/socketIo/connectionManager";

type Players = {
  id: any;
  name: string;
  position: {
    x: number;
    y: number;
  };
  color: number;
}[];

export default function Home() {
  const [tryingConnection, setTryingConnection] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const [playerId, setPlayerId] = useState("TEMP-ID");
  const [playerName, setPlayerName] = useState("TEMP-NAME");

  const [remotePlayers, setRemotePlayers] = useState<Players>([]);

  const handleSocketIoConnection = () => {
    if (!tryingConnection && !isConnected) {
      console.log("Trying to connect...");
      setTryingConnection(true);
      startSocketIo({
        setIsConnected,
        setRemotePlayers,
        setTryingConnection,
      });
    } else if (!tryingConnection && isConnected) {
      closeSocketIo();
    }
  };

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PixiStage
        playerName={playerName}
        playerId={playerId}
        playerColor={playerColor}
        playerPos={playerPos}
        playerSpeed={playerSpeed}
        setPlayerPos={setPlayerPos}
        setPlayerSpeed={setPlayerSpeed}
        remotePlayers={remotePlayers}
      />

      <MovementController
        playerPos={playerPos}
        moveX={moveX}
        moveY={moveY}
        resetPlayerPos={resetPlayerPos}
      />

      <ConnectSocketButton
        tryingConnection={tryingConnection}
        isConnected={isConnected}
        handleSocketIoConnection={handleSocketIoConnection}
      />
    </main>
  );
}
