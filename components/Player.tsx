import { Dispatch, SetStateAction } from "react";
import { useTick, Graphics } from "@pixi/react";

type PlayerProps = {
  position: {
    x: number;
    y: number;
  };
  setPosition: Dispatch<
    SetStateAction<{
      x: number;
      y: number;
    }>
  >;
  speed: {
    x: number;
    y: number;
  };
  setSpeed: Dispatch<
    SetStateAction<{
      x: number;
      y: number;
    }>
  >;
  color: number;
};

const Player = (props: PlayerProps) => {
  const { color, speed, setSpeed, position, setPosition } = props;

  const elipse = (g: any) => {
    g.clear();
    g.lineStyle(0);
    g.beginFill(color, 1);
    g.drawCircle(position.x, position.y, 10);
    g.endFill();
  };

  useTick((delta) => {
    let newX = position.x;
    let newY = position.y;

    const isWithinBounds = (pos: number, spd: number) => {
      return pos + spd > 0 && pos + spd < 400;
    };

    if (isWithinBounds(position.x, speed.x)) newX = position.x + speed.x;
    else setSpeed({ x: 0, y: speed.y });
    if (isWithinBounds(position.y, speed.y)) newY = position.y + speed.y;
    else setSpeed({ x: speed.x, y: 0 });

    setPosition({ x: newX % 400, y: newY % 400 });
  });

  return <Graphics draw={elipse} />;
};

export default Player;
