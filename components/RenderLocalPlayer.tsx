"use client";
import LocalPlayer from "./LocalPlayer";

type PlayerType = {
  stageWidth: number;
  stageHeight: number;
};

export const RenderLocalPlayer = (props: PlayerType) => {
  const { stageWidth, stageHeight } = props;

  return (
    <LocalPlayer
      key={"local-player"}
      stageWidth={stageWidth}
      stageHeight={stageHeight}
    />
  );
};
