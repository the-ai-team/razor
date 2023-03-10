import cs from 'classnames';
import { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
// Assets
import { ReactComponent as ChevronRight } from 'pixelarticons/svg/chevron-right.svg';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import { ReactComponent as LogoFill } from '../../assets/images/logo-fill.svg';
// Components
import { TOURNAMENT_ID_LENGTH } from '@razor/constants';
import { Trans, useTranslation } from 'react-i18next';
import {
  Button,
  ButtonWithInput,
  Description,
  Input,
  Link,
  Panel,
} from '../../components';
import { generateAvatarLink } from '@razor/util';

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
  const [avtarURL, setAvtarURL] = useState<string>('');

  useEffect(() => {
    if (userName === '') {
      setAvtarURL('');
    } else {
      setAvtarURL(generateAvatarLink(userName));
    }
    return () => {
      setAvtarURL('');
    };
  }, [userName]);

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
        {/* <img src={logo} className='-mb-16' alt='' /> */}
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
        <Input
          value={userName}
          onChange={(e): void => setUserName(e.target.value)}
          placeholder={t('inputs.handle') as string}
        />
        <Button onClick={routeToRoom} isFullWidth={true} isCarVisible={true}>
          {id ? t('actions.join') : t('actions.create')}
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
        {id ? (
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
