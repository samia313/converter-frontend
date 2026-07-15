'use client';

import React from 'react';

export interface ProgressStep {
  id: string;
  label: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  message?: string;
}

interface ProgressTrackerProps {
  steps: ProgressStep[];
  currentStep?: number;
  showPercentage?: boolean;
}

export function ProgressTracker({
  steps,
  currentStep,
  showPercentage = true,
}: ProgressTrackerProps) {
  const completedSteps = steps.filter((s) => s.status === 'completed').length;
  const percentage = Math.round((completedSteps / steps.length) * 100);

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-4">
      {/* Overall Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          {showPercentage && (
            <span className="text-sm font-semibold text-gray-900">{percentage}%</span>
          )}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Step List */}
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={step.id} className="flex gap-3">
            {/* Status Icon */}
            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
              {step.status === 'completed' && (
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
              )}
              {step.status === 'in-progress' && (
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              )}
              {step.status === 'pending' && (
                <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
              )}
              {step.status === 'failed' && (
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">✕</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-medium ${
                  step.status === 'failed' ? 'text-red-700' : 'text-gray-700'
                }`}
              >
                {step.label}
              </p>
              {step.message && (
                <p className={`text-xs mt-1 ${
                  step.status === 'failed' ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {step.message}
                </p>
              )}
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="absolute left-3 top-10 w-0.5 h-8 bg-gray-200" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

interface LinearProgressProps {
  value: number; // 0-100
  label?: string;
  showLabel?: boolean;
}

export function LinearProgress({ value, label, showLabel = true }: LinearProgressProps) {
  return (
    <div className="w-full space-y-1">
      {showLabel && label && (
        <div className="flex justify-between text-xs">
          <span className="font-medium text-gray-700">{label}</span>
          <span className="font-semibold text-gray-900">{Math.round(value)}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-300"
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
    </div>
  );
}

interface CircularProgressProps {
  value: number; // 0-100
  size?: number;
  label?: string;
}

export function CircularProgress({ value, size = 80, label }: CircularProgressProps) {
  const circumference = 2 * Math.PI * (size / 2 - 5);
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 5}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="2"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 5}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-gray-900">{Math.round(value)}%</span>
        </div>
      </div>
      {label && <p className="text-xs text-gray-600 font-medium">{label}</p>}
    </div>
  );
}
