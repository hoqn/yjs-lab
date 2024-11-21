import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { parseSocketUrl } from 'src/common/utils/socket.util';
import { YSocketIO } from 'y-socket.io/dist/server';
import { Server, Socket } from 'socket.io';
import { ERROR_MESSAGES } from 'src/common/constants/error.message.constants';
import * as Y from 'yjs';
const SPACE = 'space';
const NOTE = 'note';
@WebSocketGateway(9001)
export class YjsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private ysocketio: YSocketIO;
  private readonly logger = new Logger(YjsGateway.name);

  constructor() {}

  @WebSocketServer()
  server: Server;

  afterInit() {
    this.initializeSpace();
  }
  async handleConnection(socket: Socket) {
    this.logger.log(`Client connected: ${socket.id}`);
    this.logger.log(typeof this.server);
    const url = socket.handshake?.url || '';
    const { urlType, urlId } = parseSocketUrl(url);
    this.logger.log(`Parsed URL - Type: ${urlType}, ID: ${urlId}`);
  }

  handleDisconnect(socket: Socket) {
    this.logger.log(`Client disconnected: ${socket.id}`);
  }

  private async initializeSpace() {
    this.logger.log(`initializeSpace`);
    if (!this.server) {
      this.server = new Server();
    }
    this.ysocketio = new YSocketIO(this.server);

    this.ysocketio.initialize();
    this.ysocketio.on('test', async (doc: Y.Doc) => {
      this.logger.log(`initializeSpace`);
    });
  }
}
