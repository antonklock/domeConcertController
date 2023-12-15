"use client";
import { useEffect } from "react";
import { useTick, Stage, Text, Graphics } from "@pixi/react";
import * as PIXI from "pixi.js";

export const PixiStage = (props: any) => {
  let playerX = 50;
  let playerY = 50;

  let x = 0;
  let y = 0;

  //   const onTick = () => {
  //     playerX += 10;
  //     requestAnimationFrame(onTick);
  //   };

  useTick((delta) => {
    playerX += 10;
  });

  let player = (g: any) => {
    g.clear();
    g.lineStyle(0);
    g.beginFill(0xffff0b, 1);
    g.drawCircle(playerX, playerY, 10);
    g.endFill();
  };

  //   useEffect(() => {
  //     requestAnimationFrame(onTick);
  //     // return () => {
  //     //     cancelAnimationFrame(onTick);
  //     // }
  //   }, []);

  return (
    <div>
      <Stage width={400} height={400}>
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
        <Graphics draw={player} />
      </Stage>
    </div>
  );
};
