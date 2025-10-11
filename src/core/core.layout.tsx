import * as React from 'react';
import CoreBackground from '@/core/core.background.tsx';
import { useEffect } from 'react';
import InteractiveStage from '@/interactive/interactive.stage.ts';
import Address from '@/address.ts';

export default function CoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const refTransitionEl = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const transitionEl = refTransitionEl.current;
    if (!transitionEl) return;

    const playTransition = () => {
      if (!transitionEl) return;
      setTimeout(() => {
        transitionEl.style.transition = 'none';
        transitionEl.style.transform = 'translateY(-200%)';
      }, 50);
      setTimeout(() => {
        transitionEl.style.transition = 'transform 5.0s ease-in-out';
        transitionEl.style.transform = 'translateY(200%)';
      }, 70);
    };

    playTransition();
    window.addEventListener(Address.EVENT_TRANSITION_PLAY, playTransition);

    return () => {
      window.removeEventListener(Address.EVENT_TRANSITION_PLAY, playTransition);
    };
  }, []);

  return (
    <main className={'absolute left-0 top-0 w-full h-full overflow-hidden'}>
      <CoreBackground />
      <div className={'relative z-20'}>{children}</div>
      <div
        className={'absolute left-0 top-0 w-full h-full overflow-hidden z-300'}
      >
        <div
          ref={refTransitionEl}
          className={'relative w-full h-[400%] '}
          style={{
            background:
              'linear-gradient(0deg, ' +
              'rgba(0,60,61,0) 0%, ' +
              'rgba(0,60,61,1) 10%, ' +
              'rgba(221,223,31,1) 30%, ' +
              'rgba(252,248,202,1) 45%, ' +
              'rgba(252,248,202,1) 55%, ' +
              'rgba(221,223,31,1) 70%, ' +
              'rgba(0,60,61,1) 90%, ' +
              'rgba(0,60,61,0) 100% ' +
              ')',
          }}
        ></div>
      </div>

      <div
        style={{ mixBlendMode: 'difference' }}
        className={
          'absolute left-0 top-0 w-full h-full z-200 pointer-events-none'
        }
      >
        <div className={'absolute left-1/2 top-[3%] w-[7%] -translate-x-1/2'}>
          <img src={'/logo-kolon.svg'} alt={'logo-kolon'} />
        </div>
        <div
          className={'absolute left-1/2 bottom-[3%] w-[20%] -translate-x-1/2'}
        >
          <img src={'/logo-utnp.svg'} alt={'logo-utnp'} />
        </div>
        <div
          className={
            'absolute left-1/2 top-1/2 w-[70%] -translate-x-1/2 -translate-y-1/2'
          }
        >
          <img src={'/slogan.svg'} alt={'logo-utnp'} width={'100%'} />
        </div>
      </div>
    </main>
  );
}
