import ControlButton from "./ControlButton";
import { Player } from "@/stores/playerStore";

type MovementControllerProps = {
  stageWidth: number;
  stageHeight: number;
};

export const MovementController = (props: MovementControllerProps) => {
  const { stageWidth, stageHeight } = props;

  const zPlayerPos = Player((state) => state.position);
  const zPlayerSpeed = Player((state) => state.speed);
  const zSetPlayerPos = Player((state) => state.setPosition);
  const zSetPlayerSpeed = Player((state) => state.setSpeed);

  const moveX = (speed: number) => {
    zSetPlayerSpeed({ x: (zPlayerSpeed.x += speed), y: zPlayerSpeed.y });
    console.log(zPlayerSpeed);
  };
  const moveY = (speed: number) => {
    zSetPlayerSpeed({ x: zPlayerSpeed.x, y: (zPlayerSpeed.y += speed) });
    console.log(zPlayerSpeed);
  };
  const resetPlayerPos = () => {
    zSetPlayerPos({ x: stageWidth / 2, y: stageHeight / 2 });
    zSetPlayerSpeed({ x: 0, y: 0 });
  };

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="flex flex-col mt-5 items-center">
        <div className="flex flex-col">
          <ControlButton name="Up" speed={-1} onClick={moveY} />
        </div>
        <div className="flex flex-row">
          <ControlButton name="Left" speed={-1} onClick={moveX} />
          <ControlButton name="Down" speed={1} onClick={moveY} />
          <ControlButton name="Right" speed={1} onClick={moveX} />
        </div>
      </div>

      <ControlButton
        name="Reset"
        speed={0}
        onClick={resetPlayerPos}
        color="red"
      />

      <div className="flex flex-row justify-center mt-10">
        <div className="flex flex-col text-white">
          <p>Player X = {zPlayerPos.x}</p>
          <p>Player Y = {zPlayerPos.y}</p>
        </div>
      </div>
    </div>
  );
};
