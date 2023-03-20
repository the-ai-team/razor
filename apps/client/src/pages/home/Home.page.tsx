import { ReactElement, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { PLAYER_NAME_RANGE, TOURNAMENT_ID_LENGTH } from '@razor/constants';
import { playerNameSchema, tournamentIdSchema } from '@razor/models';
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
  Text,
} from '../../components';
import { TextSize, TextType } from '../../models';
import {
  endSocket,
  requestToCreateRoom,
  requestToJoinRoom,
} from '../../services';

export function Home(): ReactElement {
  const { roomId } = useParams();
  // disconnect any socket connection if user navigates back to home page.
  endSocket();

  const navigate = useNavigate();

  const [playerName, setPlayerName] = useState<string>('');
  const [isValidPlayerName, toggleIsValidPlayerName] = useState<boolean>(false);
  // value of join room button. this value will be a room id
  const [joinRoomButtonValue, setJoinRoomButtonValue] = useState<string>('');
  const [isValidJoinRoomButtonValue, toggleIsValidRoomButtonValue] =
    useState<boolean>(false);
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

  const roomIdChangeHandler = (value: string): void => {
    setJoinRoomButtonValue(value);
    // Room id is also tournament id without 'T:' prefix. Room id what players share.
    const tournamentId = `T:${value}`;
    if (tournamentIdSchema.safeParse(tournamentId).success) {
      toggleIsValidRoomButtonValue(true);
    } else {
      toggleIsValidRoomButtonValue(false);
    }
  };

  const joinRoomButtonHandler = (value: string): void => {
    // Room id is also tournament id without 'T:' prefix. Room id what players share.
    const tournamentId = `T:${value}`;
    if (tournamentIdSchema.safeParse(tournamentId).success) {
      navigate(`/${value}`);
    } else {
      alert('Invalid tournament id');
    }
  };

  const routeToRoom = (): void => {
    if (roomId) {
      requestToJoinRoom({ playerName, roomId })
        .then(roomId => {
          if (roomId) {
            navigate(`/${roomId}/room`);
          }
        })
        .catch(err => {
          alert(err);
        });
    } else {
      requestToCreateRoom({ playerName })
        .then(roomId => {
          if (roomId) {
            navigate(`/${roomId}/room`);
          }
        })
        .catch(err => {
          alert(err);
        });
    }
  };

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
        {roomId ? (
          <Text
            type={TextType.Title}
            size={TextSize.Small}
            className='-mt-5 text-opacity-70'>
            {t('room_id', { id: roomId }) as string}
          </Text>
        ) : null}
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
            onClick={(id: string): void => joinRoomButtonHandler(id)}
            onInputChange={(e): void => roomIdChangeHandler(e.target.value)}
            inputState={
              !joinRoomButtonValue
                ? InputState.Neutral
                : isValidJoinRoomButtonValue
                ? InputState.Valid
                : InputState.Invalid
            }
            inputValue={joinRoomButtonValue}
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
