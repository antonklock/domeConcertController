import { socket } from "../../socket";

type ConnectionManagerProps = {
    setIsConnected: (isConnected: boolean) => void;
    setRemotePlayers: (remotePlayers: any) => void;
    setTryingConnection: (connecting: boolean) => void;
}
    
const startSocketIo = (props: ConnectionManagerProps) => {
    const { setIsConnected, setRemotePlayers, setTryingConnection } = props;

    const onConnect = () => {
        console.log('Connect');
        setTryingConnection(false);
        setIsConnected(true);
    }
    const onDisconnect = () => {
        console.log('Disconnect');
        setTryingConnection(false);
        setIsConnected(false);
    }

    //TODO: FIX TYPING
    const updatePlayerPos = (players: any) => {
        setRemotePlayers(players);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    // socket.on("updatePlayerPositions", updatePlayerPos);
}

const closeSocketIo = () => {
    socket.off("connect");
    socket.off("disconnect");
    // socket.off("updatePlayerPositions");
}

export { startSocketIo, closeSocketIo };