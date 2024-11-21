import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Request } from 'express';
import { Server } from 'socket.io';
import { YSocketIO } from 'y-socket.io/dist/server';
import * as Y from 'yjs';
@WebSocketGateway(3001)
export class YjsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private ysocketio: YSocketIO;
  constructor() {}

  @WebSocketServer()
  server: Server;

  handleConnection() {
    console.log('연결 성공');
    if (!this.server) {
      console.log('서버 초기화 실패');
      this.server = new Server();
    }

    this.ysocketio = new YSocketIO(this.server);
    console.log('ysocketio 생성');
    this.ysocketio.on('documnet update', (doc: Y.Doc) => {
      const nodes = doc.getMap('nodes');
      const edges = doc.getMap('edges');
      const note = doc.getXmlFragment('note');

      note.observeDeep((e) => {
        console.log(`ysocketio 생성${e}`);
      });
      nodes.observe(() => {
        const nodes = Object.values(doc.getMap('nodes').toJSON);
        nodes.forEach((node) => {
          console.log(node);
        });
      });
      edges.observe(() => {
        const edges = Object.values(doc.getMap('edges').toJSON);
        edges.forEach((edge) => {
          console.log(edge);
        });
      });
    });
  }
  handleDisconnect() {
    console.log('연결 실패');
  }
}
