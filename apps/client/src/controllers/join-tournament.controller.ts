import { PROTO_JOIN_LOBBY_ACCEPT } from '@razor/constants';
import { InitialServerData } from '@razor/models';
import { store } from '@razor/store';

import { pubsub } from '../utils/pubsub';

pubsub.subscribe(PROTO_JOIN_LOBBY_ACCEPT, (data: InitialServerData) => {
  // TODO: Check for local conflicts.
  store.dispatch.game.replaceFullState({ parentState: data.snapshot });
});
