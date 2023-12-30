type ConnectSocketButtonProps = {
  tryingConnection: boolean;
  isConnected: boolean;
  handleSocketIoConnection: () => void;
};

export const ConnectSocketButton = (props: ConnectSocketButtonProps) => {
  const { tryingConnection, isConnected, handleSocketIoConnection } = props;
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      {tryingConnection ? (
        <div className="flex flex-col text-yellow-500">
          <p>Connecting...</p>
        </div>
      ) : isConnected ? (
        <div className="flex flex-col text-green-500">
          <p>Server connected</p>
        </div>
      ) : (
        <div className="flex flex-col text-red-500">
          <p>Not connected to server</p>
        </div>
      )}

      {tryingConnection ? (
        <button
          className="w-10 bg-slate-400 opacity-25 text-white rounded-xl px-12 py-4 flex justify-center m-1"
          disabled={true}
        >
          <p>Connect</p>
        </button>
      ) : (
        <button
          className="w-10 bg-green-400 text-white rounded-xl px-12 py-4 flex justify-center m-1"
          onClick={handleSocketIoConnection}
          style={
            isConnected
              ? { backgroundColor: "rgb(250 96 96)" }
              : { backgroundColor: "rgb(96 165 250)" }
          }
        >
          {isConnected ? <p>Disconnect</p> : <p>Connect</p>}
        </button>
      )}
    </div>
  );
};
