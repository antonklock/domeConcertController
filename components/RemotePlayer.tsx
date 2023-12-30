import { Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";

type PlayerProps = {
  name: string;
  position: {
    x: number;
    y: number;
  };
  color: number;
};

const textStyle = new PIXI.TextStyle({
  align: "center",
  fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
  fontSize: 10,
  fontWeight: "200",
  fill: "#ea2067",
});

const RemotePlayer = (props: PlayerProps) => {
  const { color, position, name } = props;

  const elipse = (g: any) => {
    g.clear();
    g.lineStyle(0);
    g.beginFill(color, 1);
    g.drawCircle(position.x, position.y, 10);
    g.endFill();
  };

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

export default RemotePlayer;
