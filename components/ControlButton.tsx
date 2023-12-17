type JoystickProps = {
  name: string;
  speed: number;
  onClick: (speed: number) => void;
  color?: "red" | "blue";
};

export default function Joystick(props: JoystickProps) {
  const { speed, name, onClick, color } = props;
  return (
    <button
      className="w-10 bg-blue-400 text-white rounded-xl px-12 py-4 flex justify-center m-1"
      onClick={() => onClick(speed)}
      style={color === "red" ? red : blue}
    >
      {name}
    </button>
  );
}

const blue = {
  backgroundColor: "rgb(96 165 250)",
};

const red = {
  backgroundColor: "rgb(250 96 96)",
};
