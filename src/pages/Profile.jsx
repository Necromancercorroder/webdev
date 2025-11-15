import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Shield, Save } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: '',
    phone: '',
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-xl text-gray-600">Manage your account information</p>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          {/* Profile Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-blue-600" />
              </div>
              <div className="ml-6">
                <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                  {user?.userType?.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="p-6">
            {saved && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                <span>Profile updated successfully!</span>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="4"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us about yourself..."
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 font-semibold flex items-center"
                >
                  <Save className="mr-2 w-5 h-5" />
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Account Security */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Account Security</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <p className="font-medium text-gray-900">Password</p>
                <p className="text-sm text-gray-600">Last changed 30 days ago</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 font-semibold">
                Change Password
              </button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">Add an extra layer of security</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 font-semibold">
                Enable
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
