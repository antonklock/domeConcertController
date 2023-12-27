"use client";

import { useState, useEffect } from "react";
import { PixiStage } from "@/components/PixiStage";
import { MovementController } from "@/components/MovementController";
import { ConnectSocketButton } from "@/components/ConnectSocketButton";
import getRandomColor from "@/utils/getRandomColor";
import {
  closeSocketIo,
  startSocketIo,
  checkConnection,
} from "../utils/socketIo/connectionManager";
import { socket } from "../socket";
import { v4 as uuidv4 } from "uuid";

type Player = {
  id: string;
  name: string;
  position: {
    x: number;
    y: number;
  };
  color: number;
};

export default function Home() {
  // Socket.io
  const [tryingConnection, setTryingConnection] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // Player
  const [playerId, setPlayerId] = useState(uuidv4());
  const [playerName, setPlayerName] = useState("TEMP-NAME");
  const [playerPos, setPlayerPos] = useState({ x: 200, y: 200 });
  const [playerSpeed, setPlayerSpeed] = useState({ x: 0, y: 0 });
  const [playerColor, setPlayerColor] = useState(getRandomColor());

  const [player, setPlayer] = useState<Player>({
    id: playerId,
    name: playerName,
    position: playerPos,
    color: playerColor,
  });

  useEffect(() => {
    socket.emit("updateLocalPlayer", { id: playerId, position: playerPos });
  }, [playerId, playerPos]);

  // Remote players
  const [remotePlayers, setRemotePlayers] = useState<Player[]>([]);

  const handleSocketIoConnection = () => {
    if (!tryingConnection && !isConnected) {
      setTryingConnection(true);
      //TODO: Refactor this ///////////////////////////
      startSocketIo({
        setIsConnected,
        setRemotePlayers,
        setTryingConnection,
        player,
      });
      /////////////////////////////////////////////////
    } else if (!tryingConnection && isConnected) {
      closeSocketIo();
    }
    setIsConnected(checkConnection());
  };

  useEffect(() => {
    setIsConnected(checkConnection());
  }, []);

  //TODO: Refactor this ///////////////////////////
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
  /////////////////////////////////////////////////

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
