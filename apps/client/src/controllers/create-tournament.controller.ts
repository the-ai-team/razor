import { socketProtocols } from '@razor/models';
import { store } from '@razor/store';

import { pubsub } from '../utils/pubsub';

pubsub.subscribe(socketProtocols.CreateLobbyAccept, data => {
  store.dispatch.game.replaceFullState({ parentState: data.snapshot });
});
