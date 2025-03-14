import { Phone } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-secondary mb-4">Terms of Service</h1>
        <p className="text-gray-600 mb-8">Last Updated: March 15, 2024</p>

        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-secondary mb-4">1. Introduction</h2>
            <p className="text-gray-600 mb-4">
              Welcome to AceRealtors. By accessing or using our website and services, you agree to be bound by these Terms of Service. Please read them carefully before using our platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-secondary mb-4">2. User Responsibilities</h2>
            <p className="text-gray-600 mb-4">Users of AceRealtors agree to:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Provide accurate and complete information</li>
              <li>Maintain the confidentiality of their account information</li>
              <li>Notify us immediately of any unauthorized use</li>
              <li>Use the service in compliance with all applicable laws</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-secondary mb-4">3. Account Registration</h2>
            <p className="text-gray-600 mb-4">
              To access certain features of our service, you may need to register for an account. You must:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Be at least 18 years old</li>
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your information</li>
              <li>Keep your password secure</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-secondary mb-4">4. Acceptable Use Policy</h2>
            <p className="text-gray-600 mb-4">Users must not:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Use the service for any illegal purpose</li>
              <li>Violate any regulations, rules, or laws</li>
              <li>Interfere with the proper working of the service</li>
              <li>Attempt to bypass any security measures</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-secondary mb-4">5. Intellectual Property Rights</h2>
            <p className="text-gray-600 mb-4">
              All content, features, and functionality of our service are owned by AceRealtors and are protected by international copyright, trademark, and other intellectual property rights laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-secondary mb-4">6. Service Modifications</h2>
            <p className="text-gray-600 mb-4">
              We reserve the right to modify or discontinue any part of our service without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-secondary mb-4">7. Termination</h2>
            <p className="text-gray-600 mb-4">
              We may terminate or suspend your account and access to the service immediately, without prior notice or liability, for any reason, including breach of these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-secondary mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              In no event shall AceRealtors be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or other intangible losses.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-secondary mb-4">9. Governing Law</h2>
            <p className="text-gray-600 mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-secondary mb-4">Contact Information</h2>
            <p className="text-gray-600 mb-4">
              For any questions about these Terms, please contact us at:
            </p>
            <div className="flex items-center text-primary">
              <Phone className="h-5 w-5 mr-2" />
              <a href="tel:855-696-1455">855-696-1455</a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}