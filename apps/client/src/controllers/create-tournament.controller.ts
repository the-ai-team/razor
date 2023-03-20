import { PROTO_CREATE_LOBBY_ACCEPT } from '@razor/constants';
import { InitialServerData } from '@razor/models';
import { store } from '@razor/store';

import { pubsub } from '../utils/pubsub';

console.log('PROTO_CREATE_LOBBY_ACCEPT', 'Data');

pubsub.subscribe(PROTO_CREATE_LOBBY_ACCEPT, (data: InitialServerData) => {
  console.log('PROTO_CREATE_LOBBY_ACCEPT', data);
  store.dispatch.game.replaceFullState({ parentState: data.snapshot });
});
