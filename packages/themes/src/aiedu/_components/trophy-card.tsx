'use client';
import BronzeTrophy from '@oe/assets/images/theme/aiedu/bronze-trophy.png';
import GoldTrophy from '@oe/assets/images/theme/aiedu/gold-trophy.png';
import SilverTrophy from '@oe/assets/images/theme/aiedu/silver-trophy.png';

import { Image, cn } from '@oe/ui';
import { Sparkle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { BG_TROPHY } from '../_utils/constants';
import { formatNumber } from '../_utils/functions';

type TrophyType = 'silver' | 'gold' | 'bronze';
interface TrophyCardProps {
  type?: TrophyType;
  name?: string;
  registrations?: number;
  certificates?: number;
}

const TrophyCard = ({ type = 'gold', name, registrations = 0, certificates = 0 }: TrophyCardProps) => {
  const t = useTranslations('themePage.aiedu.homepage.aieduDashboard');
  const [animatedRegistrations, setAnimatedRegistrations] = useState(0);
  const [animatedCertificates, setAnimatedCertificates] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const registrationsIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const certificatesIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Clear all timers and intervals
  const clearAllTimers = () => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }
    if (registrationsIntervalRef.current) {
      clearInterval(registrationsIntervalRef.current);
      registrationsIntervalRef.current = null;
    }
    if (certificatesIntervalRef.current) {
      clearInterval(certificatesIntervalRef.current);
      certificatesIntervalRef.current = null;
    }
  };

  // Function to start number counting animation
  const startCountAnimation = () => {
    // Reset counters to 0 to restart animation
    setAnimatedRegistrations(0);
    setAnimatedCertificates(0);

    // Clear any existing timers before starting new ones
    clearAllTimers();

    // Duration for animation in ms
    const duration = 2000;
    // Number of steps in the animation
    const steps = 30;
    // Time between each step
    const stepTime = duration / steps;

    // For registrations
    const registrationsIncrement = Math.ceil(registrations / steps);
    let registrationsCounter = 0;

    registrationsIntervalRef.current = setInterval(() => {
      registrationsCounter += registrationsIncrement;
      if (registrationsCounter >= registrations) {
        setAnimatedRegistrations(registrations);
        if (registrationsIntervalRef.current) {
          clearInterval(registrationsIntervalRef.current);
          registrationsIntervalRef.current = null;
        }
      } else {
        setAnimatedRegistrations(registrationsCounter);
      }
    }, stepTime);

    // For certificates
    const certificatesIncrement = Math.ceil(certificates / steps);
    let certificatesCounter = 0;

    certificatesIntervalRef.current = setInterval(() => {
      certificatesCounter += certificatesIncrement;
      if (certificatesCounter >= certificates) {
        setAnimatedCertificates(certificates);
        if (certificatesIntervalRef.current) {
          clearInterval(certificatesIntervalRef.current);
          certificatesIntervalRef.current = null;
        }
      } else {
        setAnimatedCertificates(certificatesCounter);
      }
    }, stepTime);
  };

  // Handle visibility changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isVisible) {
      startCountAnimation();
    } else {
      // When no longer visible, clean up all timers
      clearAllTimers();
    }

    return () => clearAllTimers();
  }, [isVisible]);

  // Use IntersectionObserver to detect when element is in viewport
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      setIsVisible(!!entry?.isIntersecting);
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
      rootMargin: '0px 0px -100px 0px',
    });

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
      clearAllTimers();
    };
  }, []);

  const trophyImage = {
    gold: (
      <div className="h-[98px] translate-y-8">
        <Image
          src={GoldTrophy?.src}
          height={98}
          width={90}
          alt="gold-trophy"
          className="h-[98px] w-full object-contain"
        />
      </div>
    ),
    silver: (
      <div className="h-[64px] translate-y-8">
        <Image
          src={SilverTrophy?.src}
          height={64}
          width={58}
          alt="silver-trophy"
          className="h-[64px] w-full object-contain"
        />
      </div>
    ),
    bronze: (
      <div className="h-[64px] translate-y-8">
        <Image
          src={BronzeTrophy?.src}
          height={64}
          width={58}
          alt="bronze-trophy"
          className="h-[64px] w-full object-contain"
        />
      </div>
    ),
  };

  return (
    <div className="trophy-card flex w-full flex-col justify-end" ref={cardRef}>
      {trophyImage?.[type]}
      <div className={cn('w-full rounded-3xl px-4 py-6 pt-12 text-center', BG_TROPHY?.[type])}>
        <h3 className="mb-2 font-bold text-xl">{name}</h3>
        <div className="flex flex-col items-center gap-2 md:flex-row md:justify-center md:gap-4">
          <div className="space-y-1">
            <p className={cn('counter-value font-bold text-xl')}>{formatNumber(animatedRegistrations)}</p>
            <p>{t('registerCount')}</p>
          </div>
          <Sparkle className={cn('sparkle', isVisible ? 'animated' : '')} />

          <div className="space-y-1">
            <p className={cn('counter-value font-bold text-xl')}>{formatNumber(animatedCertificates)}</p>
            <p>{t('certCount')}</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .trophy-card {
          transition: transform 0.5s ease-out;
        }

        .counter-value {
          position: relative;
          display: inline-block;
          transition: all 0.3s ease-out;
        }

        .counter-value::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: currentColor;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.5s ease;
        }

        .counter-value.complete::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        :global(.sparkle) {
          transition: all 0.5s ease;
        }

        :global(.sparkle.animated) {
          animation: sparkleAnimation 2s ease-in-out;
        }

        @keyframes sparkleAnimation {
          0% {
            transform: scale(1) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(360deg);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export { type TrophyCardProps, type TrophyType, TrophyCard };
