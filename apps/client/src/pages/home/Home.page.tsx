import { ReactElement, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { PLAYER_NAME_RANGE, TOURNAMENT_ID_LENGTH } from '@razor/constants';
import { playerNameSchema } from '@razor/models';
import { generateAvatarLink } from '@razor/util';
import cs from 'classnames';
import { ReactComponent as ChevronRight } from 'pixelarticons/svg/chevron-right.svg';

import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import { ReactComponent as LogoFill } from '../../assets/images/logo-fill.svg';
import {
  Button,
  ButtonWithInput,
  Description,
  Input,
  InputState,
  Link,
  Panel,
} from '../../components';
import { endSocket, initializeSocket } from '../../services/initialize-socket';

export function Home(): ReactElement {
  const { roomId } = useParams();
  // disconnect any socket connection if user navigates to home page.
  endSocket();

  const navigate = useNavigate();

  const getRoomId = (): string => {
    return '12345678';
  };
  const routeToRoom = (): void => {
    if (roomId) {
      initializeSocket({
        playerName,
        roomId,
        onTokenReceived: () => navigate(`/${roomId}/room`),
      });
    } else {
      // TODO: should receive tournament id(room id) from server
      const roomId = getRoomId();
      initializeSocket({
        playerName,
        roomId,
        onTokenReceived: () => navigate(`/${roomId}/room`),
      });
    }
  };

  const [playerName, setPlayerName] = useState<string>('');
  const [isValidPlayerName, toggleIsValidPlayerName] = useState<boolean>(false);
  const [avtarURL, setAvtarURL] = useState<string>('');

  useEffect(() => {
    if (playerNameSchema.safeParse(playerName).success) {
      toggleIsValidPlayerName(true);
    } else {
      toggleIsValidPlayerName(false);
      setAvtarURL('');
      return;
    }

    if (playerName === '') {
      setAvtarURL('');
    } else {
      setAvtarURL(generateAvatarLink(playerName));
    }

    return () => {
      setAvtarURL('');
    };
  }, [playerName]);

  const { t } = useTranslation('home');
  const panelImages: Array<string> = [
    'https://via.placeholder.com/300x150',
    'https://via.placeholder.com/300x150',
    'https://via.placeholder.com/300x150',
  ];

  return (
    <div className={cs('flex justify-center items-center', 'w-full h-full')}>
      <div
        className={cs(
          'flex flex-col justify-center items-center',
          'w-[500px] gap-8',
        )}>
        <div className='relative'>
          {avtarURL ? (
            <>
              <LogoFill className='-mb-16' />
              <img
                src={avtarURL}
                alt=''
                className='w-14 h-14 absolute top-[56%] right-[18%] rounded-2xl overflow-hidden'
              />
            </>
          ) : (
            <Logo className='-mb-16' />
          )}
        </div>
        {/* TODO: implement input validation. add max length from constants (some commits needed from previous branches) */}
        {/* Player handle(username) input and join/create button */}
        <Input
          value={playerName}
          onChange={(e): void => setPlayerName(e.target.value)}
          state={
            !playerName
              ? InputState.Neutral
              : isValidPlayerName
              ? InputState.Valid
              : InputState.Invalid
          }
          placeholder={t('inputs.handle') as string}
          props={{ maxLength: PLAYER_NAME_RANGE[1] }}
        />
        <Button
          onClick={routeToRoom}
          isFullWidth={true}
          isDisabled={isValidPlayerName ? false : true}
          isCarVisible={true}>
          {roomId ? t('actions.join') : t('actions.create')}
        </Button>
      </div>
      <Panel title={t('panel.title')}>
        <Description
          title={t('panel.descriptions.0.title')}
          image={panelImages[0]}>
          {t('panel.descriptions.0.content') as string}
        </Description>
        <Description
          title={t('panel.descriptions.1.title')}
          image={panelImages[1]}>
          {t('panel.descriptions.1.content') as string}
        </Description>
        <Description
          title={t('panel.descriptions.2.title')}
          image={panelImages[2]}>
          <Trans
            i18nKey='panel.descriptions.2.content'
            components={{
              RepoLink: (
                <Link url='https://github.com/the-ai-team/razor'>Github</Link>
              ),
            }}
          />
        </Description>
      </Panel>

      <div className='absolute bottom-4 left-4'>
        {roomId ? (
          <Button
            onClick={(): void => navigate('../')}
            icon={<ChevronRight className='w-10 h-10 text-neutral-90' />}>
            {t('actions.create_room')}
          </Button>
        ) : (
          <ButtonWithInput
            // TODO: implement id validation
            onClick={(id: string): void => navigate(`/${id}`)}
            inputSize={TOURNAMENT_ID_LENGTH}
            maxInputLength={TOURNAMENT_ID_LENGTH}
            icon={<ChevronRight className='w-10 h-10 text-neutral-90' />}>
            {t('actions.join_room')}
          </ButtonWithInput>
        )}
      </div>
    </div>
  );
}
