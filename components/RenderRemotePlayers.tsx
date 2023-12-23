"use client";
import RemotePlayer from "./RemotePlayer";
import { useState, useEffect } from "react";

type Players = {
  id: any;
  name: string;
  position: {
    x: number;
    y: number;
  };
  color: number;
}[];

export const RenderRemotePlayers = () => {
  const [players, setPlayers] = useState<Players>([]);

  let getPlayers =
    "https://dome-concert-controller-server-180a81f5a181.herokuapp.com/players";
  if (process.env.NODE_ENV === "development") {
    getPlayers = "http://localhost:3001/players";
  }

  async function getPlayersFromServer() {
    try {
      const res = await fetch(getPlayers);
      const data: Players = await res.json();
      setPlayers(data);
    } catch (e) {
      return "Could not fetch data from heruko";
    }
  }

  useEffect(() => {
    getPlayersFromServer();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Get players!");
      getPlayersFromServer();
    }, 10);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (players) {
    return players.map((player) => {
      return (
        <RemotePlayer
          key={player.id}
          position={player.position}
          color={player.color}
        />
      );
    });
  } else {
    return <></>;
  }
};
