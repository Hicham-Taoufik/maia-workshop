import { FiHelpCircle } from 'react-icons/fi';

export default function FAQPage() {
  const faqs = [
    {
      question: "What is the Visual RAG Pipeline workshop about?",
      answer: "This workshop teaches you how to build Retrieval-Augmented Generation (RAG) pipelines using low-code approaches. You'll learn to work with LLMs, Vector Stores, and build N8N agents from scratch."
    },
    {
      question: "Do I need prior programming experience?",
      answer: "While some programming knowledge is helpful, this workshop is designed for all levels. The low-code approach means you can build powerful AI applications without extensive coding experience."
    },
    {
      question: "Is the workshop free?",
      answer: "Yes, this workshop is completely free to attend. Just register to secure your spot!"
    },
    {
      question: "Where is the workshop located?",
      answer: "The workshop will be held at Higher Normal School in Tetouan on December 20, 2025, as part of the MAIA 2025 Conference."
    },
    {
      question: "Will I receive materials after the workshop?",
      answer: "Yes, all registered attendees will receive workshop materials, code examples, and resources via email after the event."
    },
    {
      question: "What is the duration of the workshop?",
      answer: "The exact schedule will be shared closer to the event date. Please check your email for updates."
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-primary-100 p-4 rounded-full mb-4">
            <FiHelpCircle className="text-primary-600 text-4xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about the workshop
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-primary-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Don't hesitate to reach out to us. We're here to help!
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

