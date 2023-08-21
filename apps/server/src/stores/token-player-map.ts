import { AuthToken, PlayerId, SocketId } from '@razor/models';

export interface MapData {
  playerId?: PlayerId;
  socketId: SocketId;
}

interface MapAsObject {
  [key: string]: MapData;
}

class TokenPlayerMap {
  private map: Map<AuthToken, MapData> = new Map<PlayerId, MapData>();

  /** Create new map entry with auth token and socket Id.
   * @param authToken - auth token of the player
   * @param socketId - socket id of the player
   */
  addSocketId(authToken: AuthToken, socketId: SocketId): void {
    this.map.set(authToken, { socketId });
  }

  /** Add player id to the existing map entry.
   * @param socketId - socket id of the player
   * @param playerId - player id of the player
   */
  addPlayerId(socketId: SocketId, playerId: PlayerId): void {
    for (const [key, value] of this.map.entries()) {
      if (value.socketId === socketId) {
        this.map.set(key, { ...value, playerId });
      }
    }
  }

  /** Get player data using auth token .
   * @param authToken - auth token of the player
   * @returns player data if player exists, null otherwise
   */
  getPlayer(authToken: AuthToken): MapData | null {
    const data = this.map.get(authToken);
    if (data) {
      return data;
    }
    return null;
  }

  /** Update existing player socket id. If player does not exist, throw error.
   * @param authToken - auth token of the player
   * @param socketId - socket id of the player
   */
  updatePlayerSocketId(authToken: AuthToken, socketId: SocketId): void {
    const data = this.map.get(authToken);
    if (data) {
      this.map.set(authToken, { ...data, socketId });
    } else {
      throw new Error('Player does not exist');
    }
  }

  /** Get player id using socket id.
   * @param socketId - socket id of the player
   * @returns player id if player exists, null otherwise
   */
  getPlayerIdBySocketId(socketId: SocketId): PlayerId | null {
    for (const [_key, value] of this.map.entries()) {
      if (value.socketId === socketId) {
        return value.playerId;
      }
    }
    return null;
  }

  /** Get socket id using player id.
   * @param playerId - player id of the player
   * @returns socket id if player exists, null otherwise
   */
  getSocketIdByPlayerId(playerId: PlayerId): SocketId | null {
    for (const [_key, value] of this.map.entries()) {
      if (value.playerId === playerId) {
        return value.socketId;
      }
    }
    return null;
  }

  /** Get auth token using socket id.
   * @param socketId - socket id of the player
   * @returns auth token if player exists, null otherwise
   */
  getAuthTokenBySocketId(socketId: SocketId): AuthToken | null {
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
  viewMap(): MapAsObject {
    return Object.fromEntries(this.map);
  }

  /** Clear a player from the map.
   * @param authToken - auth token of the player
   */
  clearPlayer(authToken: AuthToken): void {
    this.map.delete(authToken);
  }
}

export const tokenPlayerMap = new TokenPlayerMap();
