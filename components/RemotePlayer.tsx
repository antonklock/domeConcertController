import { Graphics } from "@pixi/react";

type PlayerProps = {
  position: {
    x: number;
    y: number;
  };
  color: number;
};

const RemotePlayer = (props: PlayerProps) => {
  const { color, position } = props;

  const elipse = (g: any) => {
    g.clear();
    g.lineStyle(0);
    g.beginFill(color, 1);
    g.drawCircle(position.x, position.y, 10);
    g.endFill();
  };

  return <Graphics draw={elipse} />;
};

export default RemotePlayer;
