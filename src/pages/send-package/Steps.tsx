import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaCalendarAlt, FaCheck, FaCreditCard, FaLock } from 'react-icons/fa';

import styles from './Steps.module.scss';

interface CustomStepsProps {
  step: number;
  screens: { sm: boolean | undefined };
}

const CustomSteps: React.FC<CustomStepsProps> = ({ step, screens }) => {
  const { t } = useTranslation('sendPackage');

  const steps = [
    {
      name: t('steps.selectLocker.name'),
      icon: FaLock,
      description: t('steps.selectLocker.description'),
    },
    { name: t('steps.info.name'), icon: FaCalendarAlt, description: t('steps.info.description') },
    {
      name: t('steps.payment.name'),
      icon: FaCreditCard,
      description: t('steps.payment.description'),
    },
  ];

  return (
    <div className={styles.customStepsContainer}>
      <div className={styles.progressBarWrapper}>
        {/* Progress Line Track */}
        <div className={styles.progressLineTrack}>
          {/* Dynamic Progress Line */}
          <div
            className={`${styles.progressLine} ${
              step >= 2
                ? styles.progressFull
                : step >= 1
                  ? styles.progressHalf
                  : styles.progressNone
            }`}
          >
            {step >= 1 && <div className={styles.progressShimmer} />}
          </div>
        </div>

        {/* Steps */}
        <div className={styles.stepsInner}>
          {steps.map((stepItem, index) => {
            const IconComponent = stepItem.icon;
            const isActive = step === index;
            const isCompleted = step > index;

            return (
              <div key={index} className={styles.stepItemWrapper}>
                <div className={styles.stepCircleContainer}>
                  {/* Outer Glow Ring */}
                  {isActive && <div className={styles.activeStepGlow} />}

                  {/* Main Circle */}
                  <div
                    className={`${styles.stepCircle} ${
                      isCompleted || isActive ? styles.stepActive : styles.stepInactive
                    }`}
                  >
                    <div className={styles.stepCircleInner} />

                    {/* Icon */}
                    <div className={styles.stepIcon}>
                      {isCompleted ? (
                        <FaCheck size={screens.sm ? 24 : 20} className={styles.checkIcon} />
                      ) : (
                        <IconComponent size={screens.sm ? 24 : 20} />
                      )}
                    </div>

                    {/* Border Animation */}
                    {isActive && <div className={styles.activeStepRotate} />}
                  </div>
                </div>

                <div className={styles.stepText}>
                  <div
                    className={`${styles.stepName} ${
                      isCompleted || isActive ? styles.nameActive : styles.nameInactive
                    }`}
                  >
                    {stepItem.name}
                  </div>
                  <div className={styles.stepDescription}>{stepItem.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CustomSteps;
