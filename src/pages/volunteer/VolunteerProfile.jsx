import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, Phone, Mail, MapPin, Calendar, Award, Edit2, Save, X } from 'lucide-react';

const VolunteerProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Rahul Kumar',
    email: user?.email || 'rahul.kumar@email.in',
    phone: '+91 98765 43210',
    address: '123 Main Street, Mumbai, Maharashtra 400001',
    idProof: 'Aadhar Card',
    aadharNumber: 'XXXX-XXXX-1234',
    districtArea: 'Mumbai Central',
    preferredTimings: 'Evenings (6 PM - 9 PM)',
    skills: 'Photography, Writing, Data Verification',
    backgroundCheckStatus: 'Verified',
    joinedDate: '2024-10-15',
    totalHours: 50,
    tasksCompleted: 10,
    accuracyScore: 95
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Save to backend
    alert('Profile updated successfully!');
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Volunteer Profile</h1>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-6 mb-6 pb-6 border-b">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
              <p className="text-gray-600">{profileData.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Award className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-semibold text-gray-700">Gold Badge - {profileData.accuracyScore}% Accuracy</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total Volunteering Hours</p>
              <p className="text-2xl font-bold text-blue-600">{profileData.totalHours}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Tasks Completed</p>
              <p className="text-2xl font-bold text-green-600">{profileData.tasksCompleted}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Accuracy Score</p>
              <p className="text-2xl font-bold text-purple-600">{profileData.accuracyScore}%</p>
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </label>
                <p className="text-gray-900">{profileData.email}</p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Address
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.address}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">District/Area</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="districtArea"
                    value={profileData.districtArea}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.districtArea}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ID Proof</label>
                <p className="text-gray-900">{profileData.idProof} - {profileData.aadharNumber}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Timings</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="preferredTimings"
                    value={profileData.preferredTimings}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.preferredTimings}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Joined Date
                </label>
                <p className="text-gray-900">{new Date(profileData.joinedDate).toLocaleDateString('en-IN')}</p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="skills"
                    value={profileData.skills}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.skills}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Background Check Status</label>
                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                  profileData.backgroundCheckStatus === 'Verified' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {profileData.backgroundCheckStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerProfile;
