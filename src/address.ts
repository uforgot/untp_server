import io, { Socket } from 'socket.io-client';
import type InteractiveStage from '@/interactive/interactive.stage.ts';
import type { DefaultEventsMap } from '@socket.io/component-emitter';

class Address {
  private static instance: Address;
  public interactiveStage: InteractiveStage | undefined;
  private webSocket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined;
  private data: string | undefined;

  private constructor() {
    this.setSocket();
  }

  private setSocket() {
    this.webSocket = io('http://192.168.68.65:8087', {
      transports: ['websocket', 'polling'],
    });

    this.webSocket.on('connect', this.onConnect.bind(this));
  }

  onConnect() {
    console.log('server connect');
    if (!this.webSocket) return;

    this.webSocket.on('r', (data) => {
      console.log(data);
      const tmpArray = JSON.parse(data);
      const tmpData: Array<Uint8Array> = [];
      tmpArray.forEach((item: Array<number>) => {
        tmpData.push(new Uint8Array(item));
      });

      this.interactiveStage?.setData(tmpData);
    });
  }

  public static getInstance(): Address {
    if (!Address.instance) {
      Address.instance = new Address();
    }
    return Address.instance;
  }

  public setInteractiveStage(interactiveStage: InteractiveStage) {
    this.interactiveStage = interactiveStage;
  }
}

export default Address;
