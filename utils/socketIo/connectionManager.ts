import { socket } from "../../socket";

type ConnectionManagerProps = {
    setIsConnected: (isConnected: boolean) => void;
    setRemotePlayers: (remotePlayers: any) => void;
    setTryingConnection: (connecting: boolean) => void;
}
    
const startSocketIo = (props: ConnectionManagerProps) => {
    const { setIsConnected, setRemotePlayers, setTryingConnection } = props;

    console.log('Connecting to server...');

    const onConnect = () => {
        console.log('Connected');
        setTryingConnection(false);
        setIsConnected(true);
    }
    const onDisconnect = () => {
        console.log('Disconnected');
        setTryingConnection(false);
        setIsConnected(false);
        closeSocketIo();
    }

    //TODO: FIX TYPING
    const updatePlayerPos = (players: any) => {
        setRemotePlayers(players);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("updatePlayerPositions", updatePlayerPos);
}

const checkConnection = () => {
    return socket.connected;
}

const closeSocketIo = () => {
    socket.off("connect");
    socket.off("disconnect");
    socket.off("updatePlayerPositions");
}

export { startSocketIo, closeSocketIo, checkConnection };