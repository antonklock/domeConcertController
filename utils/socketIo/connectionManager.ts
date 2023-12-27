import { socket } from "../../socket";

type ConnectionManagerProps = {
    setIsConnected: (isConnected: boolean) => void;
    setRemotePlayers: (remotePlayers: Player[]) => void;
    setTryingConnection: (connecting: boolean) => void;
}


//TODO: BREAK UP PLAYER TYPE INTO HIGH FREQUENCY UPDATES (position) AND LOW FREQUENCY UPDATES (id, name, color)
type Player = {
    id: string;
    name: string;
    position: {
        x: number;
        y: number;
    };
    color: number;
};
    
const startSocketIo = (props: ConnectionManagerProps) => {
    const { setIsConnected, setRemotePlayers, setTryingConnection } = props;

    if (!socket.connected) {
        console.log('Not connected, trying to connect...');
        setTryingConnection(true);
        socket.connect();

        setTimeout(() => {
            if (!socket.connected) {
                console.log('Could not connect to server');
                setTryingConnection(false);
                setIsConnected(false);
                socket.close();
            }
        }, 5000);
    }

    const onConnect = () => {
        console.log('Connected');

        setTryingConnection(false);
        setIsConnected(true);
        startRemotePlayersUpdate();
    }
    const onDisconnect = () => {
        console.log('Disconnected');

        setTryingConnection(false);
        setIsConnected(false);
        closeSocketIo();
        stopPlayersUpdate();
        setRemotePlayers([]);
    }

    const updateRemotePlayers = (players: Player[]) => {
        setRemotePlayers(players);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("updateAllRemotePlayers", updateRemotePlayers);
}

//////////////////////////
// Remote players update
//////////////////////////

let updateInterval: NodeJS.Timeout | null = null;

const startRemotePlayersUpdate = () => {
    if (updateInterval) clearInterval(updateInterval);
    
    updateInterval = setInterval(() => {
        socket.emit("getAllRemotePlayers");
    }, 33);
}

const stopPlayersUpdate = () => {
    if (updateInterval) {
        clearInterval(updateInterval);
        updateInterval = null;
    }
};

//////////////////////////
//////////////////////////


const checkConnection = () => {
    return socket.connected;
}

const closeSocketIo = () => {
    socket.off("connect");
    socket.off("disconnect");
    socket.off("updatePlayerPositions");

    socket.close();
    console.log("Connected: " + socket.connected);
}

export { startSocketIo, closeSocketIo, checkConnection, startRemotePlayersUpdate, stopPlayersUpdate };