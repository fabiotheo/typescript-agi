// Copyright (c) 2020, Brandon Lehmann
//
// Please see the included LICENSE file for more information.

import * as net from 'net';
import {EventEmitter} from 'events';
import {Channel} from './Channel';
import {format} from 'util';

/**
 * Represents an AGI server instance
 */
export class AGIServer extends EventEmitter {
    private readonly m_port: number;
    private readonly m_ip: string;
    private readonly m_server: net.Server = net.createServer();

    /**
     * Constructs a new instance of the object
     * @param port
     * @param ip
     */
    constructor(port: number = 3000, ip: string = '0.0.0.0') {
        super();
        this.setMaxListeners(10);

        this.m_port = port;
        this.m_ip = ip;

        this.m_server.on('connection', (socket: net.Socket) => {
            const channel = new Channel(socket);

            channel.on('ready', () => this.emit('channel', channel));
        });
    }

    /**
     * Starts the AGI server
     */
    public async start(): Promise<void> {
        this.m_server.on('error', (error) =>
            this.emit('error', new Error(
                format('Internal TCP server error: %s', error.toString()),
            )),
        );

        this.m_server.on('close', () => this.emit('close'));

        this.m_server.listen(this.m_port, this.m_ip, () => {
            this.emit('listening', this.m_port, this.m_ip);
        });
    }

    /**
     * Stops the AGI server
     */
    public async stop(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.m_server.close((error) => {
                if (error) {
                    return reject(error);
                }
                return resolve();
            });
        });
    }
}
