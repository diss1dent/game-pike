// src/socket/SocketManager.js
import io, { ManagerOptions, Socket, SocketOptions } from 'socket.io-client';

class SocketManager {
    socket: null|Socket;
    constructor() {
        this.socket = null;
    }

    connect(url: Partial<ManagerOptions & SocketOptions> | undefined) {
        this.socket = io(url);
        this.setupListeners();
    }

    setupListeners() {
        this.socket?.on('connect', () => console.log('Connected to server'));
        this.socket?.on('disconnect', () => console.log('Disconnected from server'));

        // Добавьте другие обработчики событий здесь
        this.socket?.on('message', (msg) => {
            console.log('Message from server:', msg);
        });
    }

    sendMessage(msg: string) {
        if (this.socket) {
            this.socket.emit('message', msg);
        }
    }
}

export default SocketManager;
