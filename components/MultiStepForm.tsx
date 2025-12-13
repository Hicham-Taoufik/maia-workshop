'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { FiLoader, FiCheck, FiArrowRight, FiArrowLeft } from 'react-icons/fi';

export default function MultiStepForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    jobTitleDegree: '',
    questions: '',
  });

  const totalSteps = 3;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.fullName && formData.email && formData.phone);
      case 2:
        return true; // Optional fields
      case 3:
        return true; // Review step
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
      setError('');
    } else {
      setError('Please fill in all required fields');
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setError('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      router.push(`/confirmation?number=${data.confirmationNumber}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                  currentStep === step
                    ? 'border-primary-600 bg-primary-600 text-white scale-110'
                    : currentStep > step
                    ? 'border-primary-600 bg-primary-600 text-white'
                    : 'border-neutral-300 bg-white text-neutral-400'
                }`}
              >
                {currentStep > step ? <FiCheck /> : step}
              </div>
              {step < totalSteps && (
                <div
                  className={`flex-1 h-1 mx-2 transition-all ${
                    currentStep > step ? 'bg-primary-600' : 'bg-neutral-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm">
          <span className={currentStep >= 1 ? 'text-primary-600 font-medium' : 'text-neutral-500'}>
            Personal Info
          </span>
          <span className={currentStep >= 2 ? 'text-primary-600 font-medium' : 'text-neutral-500'}>
            Additional Details
          </span>
          <span className={currentStep >= 3 ? 'text-primary-600 font-medium' : 'text-neutral-500'}>
            Review
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white text-neutral-900 rounded-2xl shadow-medium p-8 border border-neutral-200">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-neutral-900 font-display mb-6">
              Personal Information
            </h2>

            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-neutral-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-900 placeholder:text-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-900 placeholder:text-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-900 placeholder:text-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="+212 697 068 234"
              />
            </div>
          </div>
        )}

        {/* Step 2: Additional Details */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-neutral-900 font-display mb-6">
              Additional Details
            </h2>

            <div>
              <label htmlFor="organization" className="block text-sm font-semibold text-neutral-700 mb-2">
                Organization/Company
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-900 placeholder:text-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="Your organization or company"
              />
            </div>

            <div>
              <label htmlFor="jobTitleDegree" className="block text-sm font-semibold text-neutral-700 mb-2">
                Job Title/Role and Degree
              </label>
              <input
                type="text"
                id="jobTitleDegree"
                name="jobTitleDegree"
                value={formData.jobTitleDegree}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-900 placeholder:text-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="Your job title, role, and degree"
              />
            </div>

            <div>
              <label htmlFor="questions" className="block text-sm font-semibold text-neutral-700 mb-2">
                Questions or Comments
              </label>
              <textarea
                id="questions"
                name="questions"
                rows={4}
                value={formData.questions}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-900 placeholder:text-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="Any questions or comments you'd like to share..."
              />
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-neutral-900 font-display mb-6">
              Review Your Information
            </h2>

            <div className="space-y-4 bg-neutral-50 rounded-lg p-6">
              <div>
                <p className="text-sm font-semibold text-neutral-600 mb-1">Full Name</p>
                <p className="text-neutral-900">{formData.fullName}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-600 mb-1">Email</p>
                <p className="text-neutral-900">{formData.email}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-600 mb-1">Phone</p>
                <p className="text-neutral-900">{formData.phone}</p>
              </div>
              {formData.organization && (
                <div>
                  <p className="text-sm font-semibold text-neutral-600 mb-1">Organization</p>
                  <p className="text-neutral-900">{formData.organization}</p>
                </div>
              )}
              {formData.jobTitleDegree && (
                <div>
                  <p className="text-sm font-semibold text-neutral-600 mb-1">Job Title/Degree</p>
                  <p className="text-neutral-900">{formData.jobTitleDegree}</p>
                </div>
              )}
              {formData.questions && (
                <div>
                  <p className="text-sm font-semibold text-neutral-600 mb-1">Questions/Comments</p>
                  <p className="text-neutral-900">{formData.questions}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-200">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-100 text-neutral-700 rounded-lg font-medium hover:bg-neutral-200 transition-colors"
            >
              <FiArrowLeft />
              Previous
            </button>
          )}

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors ml-auto"
            >
              Next Step
              <FiArrowRight />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-8 py-3 bg-accent-500 text-white rounded-lg font-bold hover:bg-accent-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ml-auto hover:scale-105"
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Complete Registration
                  <FiCheck />
                </>
              )}
            </button>
          )}
        </div>

        <p className="text-sm text-neutral-500 text-center mt-4">
          <span className="text-red-500">*</span> Required fields
        </p>
      </form>
    </div>
  );
}

