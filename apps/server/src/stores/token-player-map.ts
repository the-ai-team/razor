import { AuthToken, PlayerId, socketId } from '@razor/models';

interface MapData {
  playerId: PlayerId;
  socketId: socketId;
}

export class TokenPlayerMap {
  private map: Map<AuthToken, MapData> = new Map<PlayerId, MapData>();

  addPlayer(
    authToken: AuthToken,
    playerId: PlayerId,
    socketId: socketId,
  ): void {
    this.map.set(authToken, { playerId, socketId });
  }

  getPlayer(authToken: AuthToken): MapData | null {
    const data = this.map.get(authToken);
    if (data) {
      return data;
    }
    return null;
  }

  // update player's socket id when player reconnects
  updatePlayerSocketId(authToken: AuthToken, socketId: socketId): void {
    const data = this.map.get(authToken);
    if (data) {
      this.map.set(authToken, { ...data, socketId });
    }
  }

  //get player id by socket id
  getPlayerIdBySocketId(socketId: socketId): PlayerId | null {
    for (const [_key, value] of this.map.entries()) {
      if (value.socketId === socketId) {
        return value.playerId;
      }
    }
    return null;
  }

  // get socket id by player id
  getSocketIdByPlayerId(playerId: PlayerId): socketId | null {
    for (const [_key, value] of this.map.entries()) {
      if (value.playerId === playerId) {
        return value.socketId;
      }
    }
    return null;
  }
}
