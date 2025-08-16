'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface SubscriptionCancellationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onYesFoundJob: () => void;
  onStillLooking: () => void;
}

export default function SubscriptionCancellationModal({
  isOpen,
  onClose,
  onYesFoundJob,
  onStillLooking
}: SubscriptionCancellationModalProps) {
  const [currentStep, setCurrentStep] = useState<'initial' | 'discount' | 'subscription'>('initial');

  // Handle escape key to close popup
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent body scroll when popup is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleStillLooking = () => {
    setCurrentStep('discount');
  };

  const handleBackToInitial = () => {
    setCurrentStep('initial');
  };

  const handleGetDiscount = () => {
    // Navigate to subscription step instead of closing
    setCurrentStep('subscription');
  };

  const handleNoThanks = () => {
    // Handle no thanks - you can add your logic here
    console.log('User declined discount');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-[20px] shadow-2xl max-w-[1000px] w-full max-h-[481px] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="relative flex items-center justify-center h-[60px] border-b border-gray-300 pr-[18px] pl-0">
          {currentStep === 'discount' && (
            <button
              onClick={handleBackToInitial}
              className="absolute left-[20px] top-[18.5px] flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="Go back"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">Back</span>
            </button>
          )}
          <h2 className="text-base font-semibold text-gray-800 font-dm-sans">Subscription Cancellation</h2>
          {currentStep === 'discount' && (
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
              <span className="text-sm text-gray-600 font-normal">Step 1 of 3</span>
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute right-[18px] top-[18px] w-6 h-6 text-gray-700 hover:text-gray-900 transition-colors flex items-center justify-center"
            aria-label="Close popup"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        {currentStep === 'initial' ? (
          <div className="flex flex-col lg:flex-row pl-6 pr-5 pt-3 pb-3 gap-[10px]">
            {/* Left Panel - Text and Buttons */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="max-w-[540px] space-y-[10px]">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                  Hey mate,<br />
                  Quick one before you go.<br />
                  <span className="italic">Have you found a job yet?</span>
                </h3>
                
                <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
                  Whatever your answer, we just want to help you take the next step. With visa support, or by hearing how we can do better.
                </p>
                
                <div className="space-y-[10px]">
                  <button
                    onClick={onYesFoundJob}
                    className="w-[540px] h-[40px] bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-all duration-200 text-base hover:shadow-md active:scale-95 border border-gray-300"
                    style={{ borderRadius: '8px' }}
                  >
                    Yes, I&apos;ve found a job
                  </button>
                  <button
                    onClick={handleStillLooking}
                    className="w-[540px] h-[40px] bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-all duration-200 text-base hover:shadow-md active:scale-95 border border-gray-300"
                    style={{ borderRadius: '8px' }}
                  >
                    Not yet - I&apos;m still looking
                  </button>
                </div>
              </div>
            </div>
            
            {/* Right Panel - Image */}
            <div className="flex-1 bg-gray-100 relative rounded-xl">
              <Image
                src="/empire-state-compressed.jpg"
                alt="New York City skyline with Empire State Building"
                fill
                className="object-cover rounded-xl"
                priority
              />
            </div>
          </div>
        ) : currentStep === 'discount' ? (
          <div className="flex flex-col lg:flex-row pl-6 pr-5 pt-3 pb-3 gap-[10px]">
            {/* Left Panel - Discount Offer */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="max-w-[540px] space-y-[12px]">
                <div className="space-y-[12px]">
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                    We built this to help you land the job, this makes it a little easier.
                  </h3>
                  <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
                    We&apos;ve been there and we&apos;re here to help you.
                  </p>
                </div>
                
                <div className="border-2 border-purple-200 rounded-lg p-4 bg-purple-50 space-y-4">
                  <p className="text-center text-gray-800 text-lg font-medium">
                    Here&apos;s <span className="font-bold text-green-600">50% off</span> until you find a job.
                  </p>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-green-600">$12.50/month</span>
                    <span className="text-lg text-gray-500 line-through ml-2">$25/month</span>
                  </div>
                  <button
                    onClick={handleGetDiscount}
                    className="w-full h-[40px] bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 text-base hover:shadow-md active:scale-95"
                  >
                    Get 50% off
                  </button>
                  <p className="text-center text-sm text-gray-600">
                    You won&apos;t be charged until your next billing date
                  </p>
                </div>
                
                <button
                  onClick={handleNoThanks}
                  className="w-full h-[40px] bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-lg transition-all duration-200 text-base hover:shadow-md active:scale-95 border border-gray-300"
                >
                  No thanks
                </button>
              </div>
            </div>
            
            {/* Right Panel - Image */}
            <div className="flex-1 bg-gray-100 relative rounded-xl">
              <Image
                src="/empire-state-compressed.jpg"
                alt="New York City skyline with Empire State Building"
                fill
                className="object-cover rounded-xl"
                priority
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row pl-6 pr-5 pt-3 pb-3 gap-[10px]">
            {/* Left Panel - Subscription Success */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="max-w-[540px] space-y-[12px]">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                  Great choice, mate!
                </h3>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                  You&apos;re still on the path to your dream role. <span className="text-purple-600">Let&apos;s make it happen together!</span>
                </h3>
                
                <div className="space-y-[8px] text-gray-600 text-base">
                  <p>You&apos;ve got XX days left on your current plan.</p>
                  <p>Starting from XX date, your monthly payment will be $12.50.</p>
                  <p>You can cancel anytime before then.</p>
                </div>
                
                <button
                  onClick={onClose}
                  className="w-full h-[40px] bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-200 text-base hover:shadow-md active:scale-95"
                >
                  Land your dream role
                </button>
              </div>
            </div>
            
            {/* Right Panel - Image */}
            <div className="flex-1 bg-gray-100 relative rounded-xl">
              <Image
                src="/empire-state-compressed.jpg"
                alt="New York City skyline with Empire State Building"
                fill
                className="object-cover rounded-xl"
                priority
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
