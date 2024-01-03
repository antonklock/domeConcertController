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
import { Player } from "@/stores/playerStore";

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

  //LOCAL PLAYER
  const zPlayerId = Player((state) => state.id);
  const zPlayerName = Player((state) => state.name);
  const zPlayerStatus = Player((state) => state.status);
  const zPlayerPos = Player((state) => state.position);
  const zPlayerColor = Player((state) => state.color);
  const zSetPlayerColor = Player((state) => state.setColor);
  const zSetPlayerId = Player((state) => state.setId);

  //STAGE
  const [stageWidth, setStageWidth] = useState(400);
  const [stageHeight, setStageHeight] = useState(400);

  useEffect(() => {
    if (gameState != "active") return;
    socket.emit("updateLocalPlayerPosition", {
      id: zPlayerId,
      position: zPlayerPos,
    });
  }, [zPlayerId, zPlayerPos, gameState]);

  // Remote players
  const [remotePlayers, setRemotePlayers] = useState<Player[]>([]);

  const handleSocketIoConnection = () => {
    const newPlayer = {
      id: zPlayerId,
      name: zPlayerName,
      position: zPlayerPos,
      color: zPlayerColor,
    };

    if (!tryingConnection && !isConnected) {
      setTryingConnection(true);
      //TODO: Refactor this ///////////////////////////
      startSocketIo({
        setIsConnected,
        setRemotePlayers,
        setTryingConnection,
        zSetPlayerId,
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
    zSetPlayerColor(getRandomColor());
  }, [zSetPlayerColor]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {zPlayerStatus === "notReady" ? (
        <>
          <h1 className="text-red-500 text-xl">NAME: {zPlayerName}</h1>
          <h1 className="text-yellow-400">STATUS: {zPlayerStatus}</h1>
          <EnterNameForm />
        </>
      ) : gameState === "notActive" ? (
        <>
          <h1 className="text-red-500 text-xl">NAME: {zPlayerName}</h1>
          <h1 className="text-green-400">STATUS: {zPlayerStatus}</h1>
          <WaitingToConnectToServer />
        </>
      ) : (
        <>
          <PixiStage
            remotePlayers={remotePlayers}
            stageWidth={stageWidth}
            stageHeight={stageHeight}
          />

          <MovementController
            stageWidth={stageWidth}
            stageHeight={stageHeight}
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
