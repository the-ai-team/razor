import { SocketProtocols } from '@razor/models';
import { store } from '@razor/store';

import { pubsub } from '../utils/pubsub';

pubsub.subscribe(SocketProtocols.JoinLobbyAccept, data => {
  // TODO: Check for local conflicts.
  store.dispatch.game.replaceFullState({ parentState: data.snapshot });
});
