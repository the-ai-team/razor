import cs from 'classnames';
import { ReactElement, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
// Assets
import { ReactComponent as ChevronRight } from 'pixelarticons/svg/chevron-right.svg';
import logo from '../../assets/images/logo.png';
// Components
import { TOURNAMENT_ID_LENGTH } from '@razor/constants';
import { useTranslation } from 'react-i18next';
import {
  Button,
  ButtonWithInput,
  Description,
  Input,
  Panel,
} from '../../components';

export function Home(): ReactElement {
  const { id } = useParams();

  const navigate = useNavigate();

  const getTournamentId = (): string => {
    return '123';
  };
  const routeToRoom = (): void => {
    if (id) {
      navigate(`/${id}/room`);
    } else {
      const tournamentId = getTournamentId();
      navigate(`/${tournamentId}/room`);
    }
  };

  const [userName, setUserName] = useState<string>('');
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
        <img src={logo} className='-mb-16' alt='' />
        {/* TODO: implement input validation. add max length from constants (some commits needed from previous branches) */}
        <Input
          value={userName}
          onChange={(e): void => setUserName(e.target.value)}
          placeholder='Your Handle'
        />
        <Button onClick={routeToRoom} isFullWidth={true} isCarVisible={true}>
          {id ? 'Join' : 'Create'}
        </Button>
      </div>
      <Panel title={t('panel.title')}>
        {panelImages.map((image, index) => {
          return (
            <Description
              key={image}
              title={t(`panel.descriptions.${index}.title`)}
              image={image}>
              {t(`panel.descriptions.${index}.content`)}
            </Description>
          );
        })}
      </Panel>

      <div className='absolute bottom-4 left-4'>
        {id ? (
          <Button
            onClick={(): void => navigate('../')}
            icon={<ChevronRight className='w-10 h-10 text-neutral-90' />}>
            Create a Room
          </Button>
        ) : (
          <ButtonWithInput
            // TODO: implement id validation
            onClick={(id: string): void => navigate(`/${id}`)}
            inputSize={TOURNAMENT_ID_LENGTH}
            maxInputLength={TOURNAMENT_ID_LENGTH}
            icon={<ChevronRight className='w-10 h-10 text-neutral-90' />}>
            Join a Room
          </ButtonWithInput>
        )}
      </div>

      {/* {id && <p className='text-white'>(id: {id})</p>}
      {id ? (
        <button className='bg-white' type='button' onClick={routeToRoom}>
          Join
        </button>
      ) : (
        <button className='bg-white' type='button' onClick={routeToRoom}>
          Create
        </button> */}
      {/* )} */}
    </div>
  );
}
