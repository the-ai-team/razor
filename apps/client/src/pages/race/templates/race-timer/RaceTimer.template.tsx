import { ReactElement, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppPlayerId, AppPlayerLogId, AppRaceId } from '@razor/models';
import { RootState, store } from '@razor/store';
import { Timer } from 'apps/client/src/components/molecules/timer/Timer.component';
import { RECENT_WPM_UPDATE_INTERVAL } from 'apps/client/src/constants/race';
import { savedData } from 'apps/client/src/utils/save-player-data';

import { computeRecentWPM } from './utils/compute-recent-wpm';

export interface RaceTimerProps {
  raceId: AppRaceId;
  isRaceStarted: boolean;
  isSpectator?: boolean;
  onTimeEnd?: () => void;
}

export function RaceTimer({
  raceId,
  isRaceStarted,
  isSpectator = false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTimeEnd = (): void => {},
}: RaceTimerProps): ReactElement {
  const recentWpmUpdateInterval = useRef<NodeJS.Timeout | null>(null);
  const [remainingTime, setRemainingTime] = useState(0);
  const [recentWPM, setRecentWPM] = useState(0);
  const [speedometerPercentage, setSpeedometerPercentage] = useState(0);
  const game = useSelector((store: RootState) => store.game);
  const selfPlayerId = useRef<AppPlayerId>(savedData.savedPlayerId);

  useEffect((): void => {
    if (!isRaceStarted) {
      return;
    }
    const race = game.racesModel[raceId];
    const raceStartedTimestamp = race.startedTimestamp;
    const raceTime = race.timeoutDuration;
    const time = raceTime - (Date.now() - raceStartedTimestamp) / 1000; // To avoid time drifts
    setRemainingTime(time);
  }, [raceId, isRaceStarted]);

  useEffect(() => {
    if (isSpectator || !isRaceStarted) {
      return;
    }

    if (recentWpmUpdateInterval.current) {
      clearInterval(recentWpmUpdateInterval.current);
    }

    recentWpmUpdateInterval.current = setInterval(() => {
      const game = store.getState().game;
      if (selfPlayerId?.current) {
        const playerLogId: AppPlayerLogId = `${raceId}-${selfPlayerId.current}`;
        const playerLogs = game.playerLogsModel[playerLogId] || [];

        const wpm = +computeRecentWPM(playerLogs).toFixed(2);
        setRecentWPM(wpm);

        // Get percentage from wpm (clamp between 0 and 1)
        const percentage = Math.min(Math.max(wpm / 100, 0), 1);
        setSpeedometerPercentage(percentage);
      }
    }, RECENT_WPM_UPDATE_INTERVAL);

    return () => {
      if (recentWpmUpdateInterval.current) {
        clearInterval(recentWpmUpdateInterval.current);
      }
    };
  }, [raceId, isRaceStarted, isSpectator]);

  return (
    <Timer
      time={remainingTime}
      speedValue={`${recentWPM} wpm`}
      speedometerPercentage={speedometerPercentage}
      showSpeed={!isSpectator}
      onTimeEnd={onTimeEnd}
    />
  );
}
