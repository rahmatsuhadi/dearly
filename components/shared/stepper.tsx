'use client';

import { motion } from 'framer-motion';
import { Check, LucideIcon } from 'lucide-react';

interface Step {
  id: number;
  name: string;
  icon: LucideIcon;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function Stepper({ steps, currentStep, className = '' }: StepperProps) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: currentStep >= step.id ? 1 : 0.9 }}
              className={`
                flex items-center justify-center w-10 h-10 rounded-full transition-colors
                ${currentStep >= step.id 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-surface-secondary text-text-muted'
                }
              `}
            >
              {currentStep > step.id ? (
                <Check className="w-5 h-5" />
              ) : (
                <step.icon className="w-5 h-5" />
              )}
            </motion.div>
            {index < steps.length - 1 && (
              <div 
                className={`
                  hidden sm:block w-12 lg:w-24 h-1 mx-2 rounded transition-colors
                  ${currentStep > step.id ? 'bg-primary-500' : 'bg-surface-secondary'}
                `} 
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-2">
        {steps.map((step) => (
          <span 
            key={step.id} 
            className={`
              text-xs font-medium
              ${currentStep >= step.id ? 'text-primary-600' : 'text-text-muted'}
            `}
          >
            {step.name}
          </span>
        ))}
      </div>
    </div>
  );
}
