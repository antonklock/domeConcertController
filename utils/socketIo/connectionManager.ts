import { socket } from "../../socket";

type ConnectionManagerProps = {
    setIsConnected: (isConnected: boolean) => void;
    setRemotePlayers: (remotePlayers: any) => void;
}
    
const startSocketIo = (props: ConnectionManagerProps) => {
    const { setIsConnected, setRemotePlayers } = props;

    const onConnect = () => {
      setIsConnected(true);
    }
    const onDisconnect = () => {
      setIsConnected(false);
    }

    const updatePlayerPos = (players: any) => {
      setRemotePlayers(players);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("updatePlayerPositions", updatePlayerPos);
}

const closeSocketIo = () => {
    socket.off("connect");
    socket.off("disconnect");
    socket.off("updatePlayerPositions");
}

export { startSocketIo, closeSocketIo };