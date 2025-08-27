import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Heart, Brain, Zap, Users, Shield, Sparkles, Check } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to SoulSync! ✨",
      description: "The world's first AI-powered dating platform that reads digital body language",
      icon: Heart,
      content: "We analyze your typing patterns, response times, and communication style to find your perfect match.",
      color: "pink"
    },
    {
      title: "AI Digital Body Language 🧠",
      description: "Revolutionary technology that understands your true emotions",
      icon: Brain,
      content: "Our AI analyzes hesitation, excitement, typing speed, and micro-interactions to understand genuine interest and compatibility.",
      color: "purple"
    },
    {
      title: "Real-time Analysis ⚡",
      description: "Get instant insights about your conversations",
      icon: Zap,
      content: "See compatibility scores, sentiment analysis, and engagement levels in real-time as you chat with potential matches.",
      color: "blue"
    },
    {
      title: "Smart Matching 🎯",
      description: "Find people who truly connect with you",
      icon: Users,
      content: "Our advanced algorithms match you based on communication compatibility, not just photos and basic info.",
      color: "green"
    },
    {
      title: "Privacy & Security 🔒",
      description: "Your data is safe and secure with us",
      icon: Shield,
      content: "Bank-level encryption, GDPR compliance, and complete control over your privacy settings.",
      color: "indigo"
    },
    {
      title: "Ready to Find Love? 💕",
      description: "Let's create your profile and start matching!",
      icon: Sparkles,
      content: "Join millions of users who found meaningful connections through AI-powered matching.",
      color: "pink"
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipOnboarding = () => {
    onComplete();
  };

  const step = steps[currentStep];
  const IconComponent = step.icon;

  return (
    <div className="fixed inset-0 bg-pink-50 z-50 flex items-center justify-center">
      {/* Cloud Effect Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-32 right-20 w-48 h-48 bg-pink-200/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-32 right-1/3 w-56 h-56 bg-blue-200/20 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep + 1} of {steps.length}
              </span>
              <button 
                onClick={skipOnboarding}
                className="text-sm text-gray-500 hover:text-pink-600 transition-colors duration-300"
              >
                Skip
              </button>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-pink-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Content */}
          <div className="mb-8">
            <div className={`inline-flex items-center justify-center w-20 h-20 bg-${step.color}-100 rounded-full mb-6`}>
              <IconComponent className={`w-10 h-10 text-${step.color}-600`} />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {step.title}
            </h2>
            
            <p className="text-xl text-gray-600 font-medium mb-6">
              {step.description}
            </p>
            
            <p className="text-gray-700 leading-relaxed max-w-xl mx-auto">
              {step.content}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                currentStep === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? 'bg-pink-500 scale-125'
                      : index < currentStep
                      ? 'bg-pink-300'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextStep}
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <span>{currentStep === steps.length - 1 ? 'Get Started' : 'Next'}</span>
              {currentStep === steps.length - 1 ? (
                <Check className="w-5 h-5" />
              ) : (
                <ArrowRight className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;