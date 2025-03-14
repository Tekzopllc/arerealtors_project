import { Award, Users, Home, Clock } from 'lucide-react';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-secondary mb-6">About AceRealtors</h1>
        
        <div className="prose max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            AceRealtors is a premium real estate agency specializing in helping homeowners sell their properties
            for the best possible price. With years of experience and a deep understanding of the market,
            we've helped countless clients achieve their real estate goals.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Award className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
              <p className="text-gray-600">
                Our team of experienced agents brings years of market knowledge and negotiation expertise
                to every transaction.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Client-Focused</h3>
              <p className="text-gray-600">
                We prioritize our clients' needs and work tirelessly to ensure they receive the best possible
                outcome for their property sale.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Home className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Market Knowledge</h3>
              <p className="text-gray-600">
                Our deep understanding of local markets helps us price and position your property for
                maximum value.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Clock className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast Results</h3>
              <p className="text-gray-600">
                We utilize modern marketing strategies and our extensive network to sell your property
                quickly and efficiently.
              </p>
            </div>
          </div>

          <div className="bg-gray-100 p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700">
              At AceRealtors, our mission is to provide exceptional real estate services that exceed our
              clients' expectations. We believe in transparency, integrity, and delivering results that
              make a difference in our clients' lives.
            </p>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Sell Your Property?</h2>
            <p className="text-gray-600 mb-6">
              Let our expert team help you get the best value for your property.
            </p>
            <a
              href="/contact"
              className="inline-block bg-primary text-white px-8 py-3 rounded-md hover:bg-primary-dark transition-colors"
            >
              Contact Us Today
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}