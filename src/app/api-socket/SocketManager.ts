import { io, ManagerOptions, Socket, SocketOptions } from 'socket.io-client';

class SocketManager {
    socket: Socket | null;

    constructor() {
        this.socket = null;
    }

    connect(url: string, options: Partial<ManagerOptions & SocketOptions>) {
        this.socket = io(url, options);
        this.setupListeners();
    }

    setupListeners() {
        this.socket?.on('connect', () => console.log('Connected to server'));
        this.socket?.on('disconnect', () => console.log('Disconnected from server'));

        // Добавьте другие обработчики событий здесь
        this.socket?.on('message', (msg: string) => {
            console.log('Message from server:', msg);
        });
    }

    emit(eventName: string, eventMessage: object) {
        if (this.socket) {
            this.socket.emit(eventName, eventMessage);
        }
    }

    joinRoom() {
        if (this.socket) {
            this.socket.emit('joinRoom');
        }
    }

    leaveRoom(room: string) {
        if (this.socket) {
            this.socket.emit('leaveRoom', room);
        }
    }

    on(event: string, callback: (...args: any[]) => void) {
        if (this.socket) {
            this.socket.on(event, callback);
        }
    }
}

export default SocketManager;
