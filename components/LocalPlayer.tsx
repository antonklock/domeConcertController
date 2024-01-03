import { useTick, Graphics, Text } from "@pixi/react";
import { Player } from "@/stores/playerStore";
import * as PIXI from "pixi.js";

type LocalPlayerProps = {
  stageWidth: number;
  stageHeight: number;
};

const textStyle = new PIXI.TextStyle({
  align: "center",
  fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
  fontSize: 10,
  fontWeight: "200",
  fill: "#5def70",
});

const LocalPlayer = (props: LocalPlayerProps) => {
  const { stageWidth, stageHeight } = props;

  const name = Player((state) => state.name);
  const color = Player((state) => state.color);
  const position = Player((state) => state.position);
  const speed = Player((state) => state.speed);
  const setSpeed = Player((state) => state.setSpeed);
  const setPosition = Player((state) => state.setPosition);

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

export default LocalPlayer;
