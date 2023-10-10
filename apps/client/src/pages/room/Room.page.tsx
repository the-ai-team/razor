import { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { MAX_ALLOWED_PLAYERS, MIN_ALLOWED_PLAYERS } from '@razor/constants';
import { AppTournamentId } from '@razor/models';
import { RootState } from '@razor/store';
import cs from 'classnames';
import { ReactComponent as LinkIcon } from 'pixelarticons/svg/link.svg';

import { ReactComponent as Logo } from '../../assets/images/logo.svg';
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
  const [hostname, setHostname] = useState<string>('');
  const addToast = useToastContext();

  // If a race ongoing on store navigate to the race page.
  useEffect((): void => {
    const raceIds = game.tournamentsModel[tournamentId]?.raceIds;
    const lastRaceId = raceIds[raceIds.length - 1] || null;
    const race = lastRaceId ? game.racesModel[lastRaceId] : null;

    if (race?.isOnGoing) {
      navigate(`/${roomId}/race`);
    }
  }, [game, roomId]);

  // Setting hostname from window object
  useEffect(() => {
    setHostname(window.location.origin);

    return () => {
      setHostname('');
    };
  }, []);

  const panelImages: Array<string> = [
    'https://via.placeholder.com/300x150',
    'https://via.placeholder.com/300x150',
    'https://via.placeholder.com/300x150',
  ];

  const copyUrlToClipboard = async (): Promise<void> => {
    const url = `${hostname}/${roomId}`;
    try {
      await navigator.clipboard.writeText(url);
      addToast({
        title: t('toasts.link_copy.title'),
        type: ToastType.Info,
        message: t('toasts.link_copy.message') as string,
        icon: <LinkIcon />,
        isImmortal: true,
      });
    } catch (e) {
      addToast({
        title: t('toasts.link_copy_failed.title'),
        type: ToastType.Error,
        message: t('toasts.link_copy_failed.message') as string,
        icon: <LinkIcon />,
        isImmortal: true,
      });
    }
  };

  return (
    <div
      className={cs(
        'flex flex-col justify-center items-center',
        'w-full h-full',
      )}>
      <Logo className='absolute top-0 left-10 w-[250px] h-[250px]' />

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

      <div className='flex flex-col w-full h-full py-32 justify-around items-center'>
        <div className='max-w-[1000px] w-10/12 h-1/2 flex flex-col justify-center items-center'>
          <PlayerList tournamentId={tournamentId} />
        </div>
        <div className={cs('relative top-20')}>
          <Button
            onClick={async (): Promise<void> => await requestToStartRace()}>
            {t('actions.start') as string}
          </Button>
        </div>
      </div>
      <div className='self-start'>
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
