import { AuthToken, PlayerId } from '@razor/models';

/** This class is used to save data for socket communication,
 * which is used to reconnect to the server when the connection is lost.
 */
class SavedData {
  private _authToken: AuthToken | null = null;
  public savedPlayerName: string | null = null;
  public savedPlayerId: PlayerId | null = null;
  public savedRoomId: string | null = null;
  private listeners: (() => void)[] = [];

  public get authToken(): AuthToken | null {
    return this._authToken;
  }

  public set authToken(value: AuthToken | null) {
    this._authToken = value;
    this.runListeners();
  }

  public reset(): void {
    this._authToken = null;
    this.savedPlayerName = null;
    this.savedPlayerId = null;
    this.savedRoomId = null;
    this.runListeners();
  }

  // run all listeners when value is changed.
  private runListeners(): void {
    this.listeners.forEach(func => func());
  }

  // Call when value is changed.
  public addEventListener(func: () => void): void {
    this.listeners.push(func);
  }

  public removeEventListener(func: () => void): void {
    const index = this.listeners.indexOf(func);
    if (index !== -1) {
      this.listeners.splice(index, 1);
    }
  }
}

export const savedData = new SavedData();
