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
}
