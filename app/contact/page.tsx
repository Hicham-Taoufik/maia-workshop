'use client';

import { useState, FormEvent } from 'react';
import { FiMail, FiPhone, FiSend, FiLoader, FiMapPin, FiCalendar, FiExternalLink, FiMessageCircle, FiClock } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      alert(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
            <FiMessageCircle className="text-accent-300" />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4 animate-slide-up">
            Contact Us
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto animate-slide-up delay-100">
            Have questions about the workshops? We're here to help!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Quick Contact Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-medium border border-neutral-100 hover:shadow-hard transition-all duration-300 hover:-translate-y-1 animate-scale-in">
            <div className="bg-primary-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <FiMail className="text-primary-600 text-2xl" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2 font-display">Email Us</h3>
            <a
              href="mailto:hichame.taoufik1@gmail.com"
              className="text-primary-600 hover:text-primary-700 transition-colors break-all text-sm font-medium"
            >
              hichame.taoufik1@gmail.com
            </a>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-medium border border-neutral-100 hover:shadow-hard transition-all duration-300 hover:-translate-y-1 animate-scale-in delay-100">
            <div className="bg-primary-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <FiPhone className="text-primary-600 text-2xl" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2 font-display">Call Us</h3>
            <a
              href="tel:+212697068234"
              className="text-primary-600 hover:text-primary-700 transition-colors text-sm font-medium"
            >
              +212 697 068 234
            </a>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Form */}
          <div className="animate-slide-up delay-300">
            <div className="bg-white rounded-xl shadow-medium p-8 border border-neutral-100">
              <h2 className="text-3xl font-bold text-neutral-900 mb-2 font-display">
                Send us a Message
              </h2>
              <p className="text-neutral-600 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              {submitted ? (
                <div className="bg-green-50 border-l-4 border-green-500 text-green-800 px-6 py-4 rounded-lg mb-4 animate-scale-in">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Message Sent Successfully!</h4>
                      <p className="text-sm text-green-700">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
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
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-neutral-700 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="What is this regarding?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-medium flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <FiLoader className="animate-spin text-xl" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend className="text-xl" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column - Info */}
          <div className="space-y-6 animate-slide-up delay-400">
            {/* Workshop Information */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white rounded-xl p-8 shadow-medium">
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="/images/maia-logo-white-bg.jpg"
                  alt="MAIA Logo"
                  width={60}
                  height={60}
                  className="rounded-lg"
                />
                <div>
                  <h3 className="text-2xl font-bold font-display">MAIA 2025</h3>
                  <p className="text-primary-200 text-sm">Professional AI Workshops</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FiCalendar className="text-accent-300 text-xl flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Workshop Date</h4>
                    <p className="text-primary-100">December 20, 2025</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FiMapPin className="text-accent-300 text-xl flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Location</h4>
                    <p className="text-primary-100">ENS-Tetouan, Morocco</p>
                    <p className="text-sm text-primary-200">Higher Normal School - Tetouan</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FiClock className="text-accent-300 text-xl flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Conference Dates</h4>
                    <p className="text-primary-100">December 18-20, 2025</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-primary-500">
                <a
                  href="https://icmaia.ens-tetouan.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white hover:text-accent-300 transition-colors font-medium"
                >
                  Visit Conference Website <FiExternalLink />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

