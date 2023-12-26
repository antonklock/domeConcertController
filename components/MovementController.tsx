import ControlButton from "./ControlButton";

type MovementControllerProps = {
  playerPos: { x: number; y: number };
  moveY: (speed: number) => void;
  moveX: (speed: number) => void;
  resetPlayerPos: () => void;
};

export const MovementController = (props: MovementControllerProps) => {
  const { playerPos, moveY, moveX, resetPlayerPos } = props;
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
          <p>Player X = {playerPos.x}</p>
          <p>Player Y = {playerPos.y}</p>
        </div>
      </div>
    </div>
  );
};
