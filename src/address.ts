import * as Ably from 'ably';
import io, { Socket } from 'socket.io-client';
import type InteractiveStage from '@/interactive/interactive.stage.ts';
import type { DefaultEventsMap } from '@socket.io/component-emitter';

class Address {
  private static instance: Address;
  public interactiveStage: InteractiveStage | undefined;
  private webSocket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined;

  private constructor() {
    this.setSocket();

    window.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'f') {
        const el = document.querySelector('main');
        el?.requestFullscreen().then(() => {});
      }
    });
  }

  private setSocket() {
    const ably = new Ably.Realtime(
      'LWMPBA.iyAokg:uUWmR8k2r-li4oPBlT-rz83ju_qSEMMLkd1w2Jxqmig'
    );

    ably.connection.once('connected', async () => {
      console.log('Connected to Ably!');
      const channel = ably.channels.get('utnp');
      await channel.subscribe('send', (message) => {
        console.log('Received message from Ably!');
        const tmpArray = JSON.parse(message.data);
        const tmpData: Array<Uint8Array> = [];
        tmpArray.forEach((item: Array<number>) => {
          tmpData.push(new Uint8Array(item));
        });

        this.interactiveStage?.setData(tmpData);
      });
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
