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
import { EnterNameForm } from "@/components/EnterNameForm";
import { WaitingToConnectToServer } from "@/components/WaitingToConnectToServer";

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

  // Game
  const [gameState, setGameState] = useState<"active" | "notActive">(
    "notActive"
  );
  const [playerState, setPlayerState] = useState<"ready" | "notReady">(
    "notReady"
  );

  useEffect(() => {
    if (isConnected) {
      setGameState("active");
    } else {
      setGameState("notActive");
    }
  }, [isConnected]);

  // Player
  const [playerId, setPlayerId] = useState("TEMP-ID");
  const [playerName, setPlayerName] = useState("TEMP-NAME");
  const [playerPos, setPlayerPos] = useState({ x: 200, y: 200 });
  const [playerSpeed, setPlayerSpeed] = useState({ x: 0, y: 0 });
  const [playerColor, setPlayerColor] = useState(getRandomColor());

  const [stageWidth, setStageWidth] = useState(400);
  const [stageHeight, setStageHeight] = useState(400);

  useEffect(() => {
    console.log("playerId: ", playerId);
  }, [playerId]);

  useEffect(() => {
    if (gameState != "active") return;
    socket.emit("updateLocalPlayerPosition", {
      id: playerId,
      position: playerPos,
    });
  }, [playerId, playerPos, gameState]);

  // Remote players
  const [remotePlayers, setRemotePlayers] = useState<Player[]>([]);

  const handleSocketIoConnection = () => {
    const newPlayer = {
      id: playerId,
      name: playerName,
      position: playerPos,
      color: playerColor,
    };

    if (!tryingConnection && !isConnected) {
      setTryingConnection(true);
      //TODO: Refactor this ///////////////////////////
      startSocketIo({
        setIsConnected,
        setRemotePlayers,
        setTryingConnection,
        setPlayerId,
        player: newPlayer,
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
    setPlayerPos({ x: stageWidth / 2, y: stageHeight / 2 });
    setPlayerSpeed({ x: 0, y: 0 });
  };
  /////////////////////////////////////////////////

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {playerState === "notReady" ? (
        <>
          <h1 className="text-red-500 text-xl">{playerName}</h1>
          <EnterNameForm
            setPlayerState={setPlayerState}
            setPlayerName={setPlayerName}
            player={{ id: playerId, name: playerName, color: playerColor }}
          />
        </>
      ) : gameState === "notActive" ? (
        <>
          <h1 className="text-red-500 text-xl">{playerName}</h1>
          <WaitingToConnectToServer setPlayerState={setPlayerState} />
        </>
      ) : (
        <>
          <PixiStage
            playerName={playerName}
            playerId={playerId}
            playerColor={playerColor}
            playerPos={playerPos}
            playerSpeed={playerSpeed}
            setPlayerPos={setPlayerPos}
            setPlayerSpeed={setPlayerSpeed}
            remotePlayers={remotePlayers}
            stageWidth={stageWidth}
            stageHeight={stageHeight}
          />

          <MovementController
            playerPos={playerPos}
            moveX={moveX}
            moveY={moveY}
            resetPlayerPos={resetPlayerPos}
          />
        </>
      )}

      <ConnectSocketButton
        tryingConnection={tryingConnection}
        isConnected={isConnected}
        handleSocketIoConnection={handleSocketIoConnection}
      />
    </main>
  );
}
