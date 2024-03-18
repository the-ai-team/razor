interface AudioInstance {
  instance: HTMLAudioElement;
  lastPlayedTimestamp: number;
}

export class AudioManager {
  /** Link of the audio */
  private audioLink: string;
  /** Circular dynamic array containing audios */
  private audioCircularArray: AudioInstance[] = [];
  /** Pointer to the next audio to be played */
  private nextPointer = 0;
  /** Number of initial audio instances to be created */
  private initialAudioCount = 2;

  constructor(link: string) {
    this.audioLink = link;
    this.initializeAudioInstances();
  }

  /** Update the pointer to the next audio instance in the circular array */
  private updatePointer(): void {
    this.nextPointer = (this.nextPointer + 1) % this.audioCircularArray.length;
  }

  /** Update pointer to oldest instance */
  private updatePointerToOldest(): void {
    const oldestAudio = this.audioCircularArray.reduce((prev, curr) =>
      prev.lastPlayedTimestamp < curr.lastPlayedTimestamp ? prev : curr,
    );
    this.nextPointer = this.audioCircularArray.indexOf(oldestAudio);
  }

  /** Create a new audio instance and push it to the list */
  private createNewAudio(): HTMLAudioElement {
    const audio = new Audio(this.audioLink);
    this.audioCircularArray.push({
      instance: audio,
      lastPlayedTimestamp: Date.now(),
    });
    return audio;
  }

  /** Create few Audio instances at the beginning and push them to the list */
  private initializeAudioInstances(): void {
    for (let i = 0; i < this.initialAudioCount; i++) {
      this.createNewAudio();
    }
  }

  /** Get the next audio instance to be played.
   * If the audio instance is already playing,
   * create a new one and set the pointer to oldest audio instance.
   */
  private getNextAudioInstance(): HTMLAudioElement {
    const audioInstance = this.audioCircularArray[this.nextPointer];

    // If audio is instance is paused means it is just created or it played completely,
    // as we don't pause the audio purposely.
    if (audioInstance.instance.paused) {
      audioInstance.lastPlayedTimestamp = Date.now();
      this.updatePointer();
      return audioInstance.instance;
    }

    this.updatePointerToOldest();
    return this.createNewAudio();
  }

  public playAudio(): void {
    const audio = this.getNextAudioInstance();
    audio.play();
  }
}
