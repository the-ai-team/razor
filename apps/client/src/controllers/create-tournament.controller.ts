import { InitialServerData, SocketProtocols } from '@razor/models';
import { store } from '@razor/store';

import { pubsub } from '../utils/pubsub';

pubsub.subscribe(
  SocketProtocols.CreateLobbyAccept,
  (data: InitialServerData): void => {
    store.dispatch.game.replaceFullState({ parentState: data.snapshot });
  },
);
