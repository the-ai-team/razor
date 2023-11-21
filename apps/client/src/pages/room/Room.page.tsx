import { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { MAX_ALLOWED_PLAYERS, MIN_ALLOWED_PLAYERS } from '@razor/constants';
import { AppTournamentId, AppTournamentState } from '@razor/models';
import { RootState } from '@razor/store';
import cs from 'classnames';
import { ReactComponent as LinkIcon } from 'pixelarticons/svg/link.svg';

import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import banner1 from '../../assets/images/panel-images/room1.png';
import banner2 from '../../assets/images/panel-images/room2.png';
import banner3 from '../../assets/images/panel-images/room3.png';
import {
  Button,
  Description,
  IconButton,
  Panel,
  ToastType,
} from '../../components';
import { useToastContext } from '../../hooks/useToastContext';
import { requestToStartRace } from '../../services/handlers';

import { PlayerList } from './templates/player-list/PlayerList.template';

export function Room(): ReactElement {
  const { t } = useTranslation(['room']);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const game = useSelector((store: RootState) => store.game);
  const tournamentId: AppTournamentId = `T:${roomId}`;
  const [playerIds, setPlayerIds] = useState(
    game.tournamentsModel[tournamentId]?.playerIds,
  );
  const [hostname, setHostname] = useState<string>('');
  const addToast = useToastContext();

  // Setting hostname from window object
  useEffect(() => {
    setHostname(window.location.origin);

    return () => {
      setHostname('');
    };
  }, []);

  // If the tournament state is Race navigate to the race page.
  useEffect((): void => {
    const tournamentId: AppTournamentId = `T:${roomId}`;
    const tournament = game.tournamentsModel[tournamentId];

    if (tournament.state === AppTournamentState.Race) {
      navigate(`/${roomId}/race`);
    }
  }, [game, roomId]);

  // Update playerIds
  useEffect(() => {
    setPlayerIds(game.tournamentsModel[tournamentId]?.playerIds);
  }, [game.playersModel, game.tournamentsModel, tournamentId]);

  const panelImages: Array<string> = [banner1, banner2, banner3];

  const copyUrlToClipboard = async (): Promise<void> => {
    const url = `${hostname}/${roomId}`;
    try {
      await navigator.clipboard.writeText(url);
      addToast({
        title: t('toasts.link_copy.title'),
        type: ToastType.Info,
        message: t('toasts.link_copy.message') as string,
        icon: <LinkIcon />,
      });
    } catch (e) {
      addToast({
        title: t('toasts.link_copy_failed.title'),
        type: ToastType.Error,
        message: t('toasts.link_copy_failed.message') as string,
        icon: <LinkIcon />,
      });
    }
  };

  return (
    <div className='h-full w-full'>
      <Logo className='absolute top-0 left-10 w-[150px] h-[150px]' />
      <Panel title={t('panel.title')}>
        <Description
          title={t('panel.descriptions.0.title')}
          image={panelImages[0]}>
          {
            t('panel.descriptions.0.content', {
              min: MIN_ALLOWED_PLAYERS,
              max: MAX_ALLOWED_PLAYERS,
            }) as string
          }
        </Description>
        <Description
          title={t('panel.descriptions.1.title')}
          image={panelImages[1]}>
          {t('panel.descriptions.1.content') as string}
        </Description>
        <Description
          title={t('panel.descriptions.2.title')}
          image={panelImages[2]}>
          {t('panel.descriptions.2.content') as string}
        </Description>
      </Panel>

      <div
        className={cs(
          'flex flex-col justify-center py-20 items-center',
          'w-full h-full',
        )}>
        <div className='flex grow flex-col w-full h-1/2 justify-around items-center'>
          <div
            className={cs(
              'max-w-[1000px] w-10/12 h-full',
              'my-24',
              'overflow-hidden flex flex-col justify-center items-center',
            )}>
            <PlayerList tournamentId={tournamentId} />
          </div>
        </div>
        <div className='mx-auto my-12'>
          <Button
            isDisabled={!playerIds || playerIds.length < MIN_ALLOWED_PLAYERS}
            onClick={async (): Promise<void> => await requestToStartRace()}>
            {t('actions.start') as string}
          </Button>
        </div>
      </div>

      <div className='absolute left-10 bottom-10'>
        <IconButton
          label={t('actions.copy_url') as string}
          icon={<LinkIcon className='w-full h-full text-neutral-90' />}
          onClick={(): void => {
            copyUrlToClipboard();
          }}>
          {`razor.url/${roomId}`}
        </IconButton>
      </div>
    </div>
  );
}
