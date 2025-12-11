'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { FiLoader, FiCheck } from 'react-icons/fi';

export default function RegisterPage() {
  const router = useRouter();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block bg-primary-100 px-4 py-2 rounded-full text-primary-700 font-semibold text-sm mb-4">
            MAIA 2025 Workshops
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4 font-display">
            Workshop Registration
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Secure your spot for the professional AI workshops on December 20, 2025
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-medium p-8 border border-neutral-200">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {/* Full Name */}
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
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
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
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Phone */}
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
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="+212 697 068 234"
              />
            </div>

            {/* Organization/Company */}
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
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="Your organization or company"
              />
            </div>

            {/* Job Title/Role and Degree */}
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
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="Your job title, role, and degree"
              />
            </div>

            {/* Questions/Comments */}
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
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                placeholder="Any questions or comments you'd like to share..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 pt-6 border-t border-neutral-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent-500 text-white rounded-lg font-bold text-lg hover:bg-accent-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 shadow-medium"
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
            <p className="text-sm text-neutral-500 text-center mt-4">
              <span className="text-red-500">*</span> Required fields
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

