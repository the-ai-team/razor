import { useEffect, useState } from 'react';

import { RaceConstants } from '../../constants';

/** Compute max race tracks count on window height change */
export function useComputeMaxRaceTracks(): number {
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowHeight(window.innerHeight);
    });

    return () => {
      window.removeEventListener('resize', () => {
        setWindowHeight(window.innerHeight);
      });
    };
  }, []);

  const maxRaceTracks = RaceConstants.MIN_RACE_TRACKS;
  const approxAllocatableRaceTrackHeight = windowHeight * 0.35;
  if (approxAllocatableRaceTrackHeight > 300) {
    const freeHeight = approxAllocatableRaceTrackHeight - 300;
    const additionalRaceTracks = Math.floor(freeHeight / 15); // Considering one row takes 20px
    return additionalRaceTracks + maxRaceTracks;
  }

  return maxRaceTracks;
}
