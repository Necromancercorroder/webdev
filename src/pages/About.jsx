import React from 'react';
import { Heart, Users, Target, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Social Impact Platform India
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connecting Indian NGOs, donors, and volunteers to create meaningful social impact across India with complete transparency and accountability.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We believe in the power of collective action to create positive change across India. 
            Our platform bridges the gap between those who want to help and those who need help in every corner of the nation, 
            ensuring that every contribution makes a real, measurable impact in Indian communities.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="text-center">
            <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
              <Heart className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Compassion</h3>
            <p className="text-gray-600">
              We care deeply about making a difference in people's lives
            </p>
          </div>

          <div className="text-center">
            <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
              <Target className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Transparency</h3>
            <p className="text-gray-600">
              Complete visibility into where donations go and their impact
            </p>
          </div>

          <div className="text-center">
            <div className="inline-block p-4 bg-purple-100 rounded-full mb-4">
              <Users className="w-12 h-12 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Community</h3>
            <p className="text-gray-600">
              Building a nationwide network of Indian changemakers
            </p>
          </div>

          <div className="text-center">
            <div className="inline-block p-4 bg-yellow-100 rounded-full mb-4">
              <Award className="w-12 h-12 text-yellow-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Impact</h3>
            <p className="text-gray-600">
              Measurable results that create lasting change
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-blue-600 text-white rounded-lg shadow-lg p-12 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold mb-2">500+</p>
              <p className="text-xl text-blue-100">Active Campaigns Across India</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">₹50Cr+</p>
              <p className="text-xl text-blue-100">Funds Raised</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">1L+</p>
              <p className="text-xl text-blue-100">Indian Lives Impacted</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Whether you're an NGO looking to amplify your impact, a donor seeking meaningful ways to give, 
            or a volunteer ready to make a difference, we're here to help you succeed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
