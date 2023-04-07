import { InitialServerData, socketProtocols } from '@razor/models';
import { store } from '@razor/store';

import { pubsub } from '../utils/pubsub';

pubsub.subscribe(socketProtocols.JoinLobbyAccept, (data: InitialServerData) => {
  // TODO: Check for local conflicts.
  store.dispatch.game.replaceFullState({ parentState: data.snapshot });
});
