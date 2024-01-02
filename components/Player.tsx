import { useTick, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";

type PlayerProps = {
  name: string;
  position: {
    x: number;
    y: number;
  };
  speed: {
    x: number;
    y: number;
  };
  color: number;
  stageWidth: number;
  stageHeight: number;
  setPosition: (position: { x: number; y: number }) => void;
  setSpeed: (speed: { x: number; y: number }) => void;
};

const textStyle = new PIXI.TextStyle({
  align: "center",
  fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
  fontSize: 10,
  fontWeight: "200",
  fill: "#5def70",
});

const Player = (props: PlayerProps) => {
  const {
    color,
    speed,
    setSpeed,
    position,
    setPosition,
    name,
    stageWidth,
    stageHeight,
  } = props;

  const elipse = (g: any) => {
    g.clear();
    g.lineStyle(0);
    g.beginFill(color, 1);
    g.drawCircle(position.x, position.y, 10);
    g.endFill();
  };

  useTick((delta) => {
    let newX = position.x + speed.x;
    let newY = position.y + speed.y;

    if (newX > stageWidth) newX -= stageWidth;
    if (newX < 0) newX += stageWidth;
    if (newY > stageHeight) newY -= stageHeight;
    if (newY < 0) newY += stageHeight;

    setPosition({ x: newX, y: newY });
  });

  return (
    <>
      <Graphics draw={elipse} />
      <Text
        text={name}
        style={textStyle}
        anchor={0.5}
        x={position.x}
        y={position.y + 25}
      />
    </>
  );
};

export default Player;
