import { InitialServerData, socketProtocols } from '@razor/models';
import { store } from '@razor/store';

import { pubsub } from '../utils/pubsub';

pubsub.subscribe(
  socketProtocols.CreateLobbyAccept,
  (data: InitialServerData) => {
    store.dispatch.game.replaceFullState({ parentState: data.snapshot });
  },
);
