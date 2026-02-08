'use client';

import { useState } from 'react';

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const calculateStrength = () => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strength = calculateStrength();
  const strengthColors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400'];
  const strengthLabels = ['Lemah', 'Cukup', 'Baik', 'Kuat'];

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-1 flex-1 rounded-full transition-colors ${
              level <= strength ? strengthColors[strength - 1] : 'bg-border'
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-text-tertiary">
        Kekuatan: {strengthLabels[strength - 1] || 'Sangat Lemah'}
      </p>
    </div>
  );
}

interface PasswordMatchProps {
  password: string;
  confirmPassword: string;
}

export function PasswordMatch({ password, confirmPassword }: PasswordMatchProps) {
  if (!confirmPassword) return null;
  
  if (password !== confirmPassword) {
    return <p className="text-xs text-red-500 mt-1">Password tidak cocok</p>;
  }
  
  return <p className="text-xs text-green-500 mt-1">Password cocok</p>;
}
