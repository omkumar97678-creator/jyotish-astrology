import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import StarField from '@/components/StarField';
import Progress from '@/components/onboarding/Progress';
import StepName from '@/components/onboarding/StepName';
import StepDob from '@/components/onboarding/StepDob';
import StepTime from '@/components/onboarding/StepTime';
import StepPlace from '@/components/onboarding/StepPlace';
import StepReveal from '@/components/onboarding/StepReveal';

const variants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    dob: { day: '', month: '', year: '' },
    time: { hour: '', minute: '', period: 'AM' },
    unknownTime: false,
    birthPlace: '',
  });

  const goNext = () => {
    setDirection(1);
    setStep((s) => s + 1);
  };
  const goBack = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const props = { formData, setFormData, goNext, goBack };
  const steps = [
    <StepName key="0" {...props} />,
    <StepDob key="1" {...props} />,
    <StepTime key="2" {...props} />,
    <StepPlace key="3" {...props} />,
    <StepReveal key="4" {...props} />,
  ];

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--col-midnight)' }}>
      <StarField count={80} />

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-5 pt-28 pb-16">
        <div className="w-full mb-6 max-w-[520px] flex justify-center">
          <Progress step={step} total={5} />
        </div>
        <div className="w-full" style={{ maxWidth: 520 }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
            >
              {steps[step]}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}