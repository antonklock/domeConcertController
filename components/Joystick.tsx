import { useState } from "react";

export default function Joystick() {
  const playerSpeed = 10;

  const [playerX, setPlayerX] = useState(50);
  const [playerY, setPlayerY] = useState(50);

  const moveX = (speed: number) => {
    setPlayerX((playerX % 400) + speed);
  };
  const moveY = (speed: number) => {
    setPlayerY((playerY % 400) + speed);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={() => moveY(playerSpeed)}>Up</button>
      <button onClick={() => moveY(-playerSpeed)}>Down</button>
      <button onClick={() => moveX(-playerSpeed)}>Left</button>
      <button onClick={() => moveX(playerSpeed)}>Right</button>
    </main>
  );
}
