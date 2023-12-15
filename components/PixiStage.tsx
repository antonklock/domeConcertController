"use client";
import { useState } from "react";
import { useTick, Stage, Text, Graphics } from "@pixi/react";
import * as PIXI from "pixi.js";

const Player = () => {
  const [playerX, setPlayerX] = useState(50);
  const [playerY, setPlayerY] = useState(50);

  const elipse = (g: any) => {
    g.clear();
    g.lineStyle(0);
    g.beginFill(0xffff0b, 1);
    g.drawCircle(playerX, playerY, 10);
    g.endFill();
  };

  useTick((delta) => {
    setPlayerX((playerX % 400) + 3);
    // setPlayerY((playerY % 400) + 1);
  });

  return <Graphics draw={elipse} />;
};

export const PixiStage = (props: any) => {
  let playerX = 50;
  let playerY = 50;

  let x = 0;
  let y = 0;

  return (
    <div>
      <Stage
        width={400}
        height={400}
        options={{ autoDensity: true, backgroundColor: 0x01262a }}
      >
        <Text
          text="Hello World!"
          anchor={{ x: 0.5, y: 0.5 }}
          x={200}
          y={200}
          style={
            new PIXI.TextStyle({
              align: "center",
              fontSize: 24,
              fill: ["#ffffff", "#00ff99"], // gradient
            })
          }
        />
        <Player />
      </Stage>
    </div>
  );
};
