import { AuthToken, PlayerId, socketId } from '@razor/models';

interface MapData {
  playerId?: PlayerId;
  socketId: socketId;
}

interface mapAsObject {
  [key: string]: MapData;
}

class TokenPlayerMap {
  private map: Map<AuthToken, MapData> = new Map<PlayerId, MapData>();

  /** Create new map entry with auth token and socket Id.
   * @param authToken - auth token of the player
   * @param socketId - socket id of the player
   */
  addSocketId(authToken: AuthToken, socketId: socketId): void {
    this.map.set(authToken, { socketId });
  }

  /** Add player id to the existing map entry.
   * @param socketId - socket id of the player
   * @param playerId - player id of the player
   */
  addPlayerId(socketId: socketId, playerId: PlayerId): void {
    for (const [key, value] of this.map.entries()) {
      if (value.socketId === socketId) {
        this.map.set(key, { ...value, playerId });
      }
    }
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

  //get auth token by socket id
  getAuthTokenBySocketId(socketId: socketId): AuthToken | null {
    for (const [key, value] of this.map.entries()) {
      if (value.socketId === socketId) {
        return key;
      }
    }
    return null;
  }

  /** Get all entries
   * @returns - map as a object
   */
  viewMap(): mapAsObject {
    return Object.fromEntries(this.map);
  }

  // clear player after retries
  clearPlayer(authToken: AuthToken): void {
    this.map.delete(authToken);
  }
}

export const tokenPlayerMap = new TokenPlayerMap();
