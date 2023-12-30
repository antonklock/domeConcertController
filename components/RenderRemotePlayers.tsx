"use client";
import RemotePlayer from "./RemotePlayer";

type Players = {
  id: any;
  name: string;
  position: {
    x: number;
    y: number;
  };
  color: number;
}[];

type RenderRemotePlayersProps = {
  players: Players;
};

export const RenderRemotePlayers = (props: RenderRemotePlayersProps) => {
  const { players } = props;

  if (players) {
    return players.map((player) => {
      return (
        <RemotePlayer
          key={player.id}
          position={player.position}
          color={player.color}
          name={player.name}
        />
      );
    });
  } else {
    return false;
  }
};
