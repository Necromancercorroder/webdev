import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampaigns } from '../contexts/CampaignContext';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft, Upload } from 'lucide-react';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const { createCampaign } = useCampaigns();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Only NGOs can create campaigns
  if (!user || user.userType !== 'ngo') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">Only NGOs can create campaigns.</p>
          <button
            onClick={() => navigate('/campaigns')}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Browse Campaigns
          </button>
        </div>
      </div>
    );
  }
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'education',
    goal: '',
    location: '',
    image: '',
    organizationName: user?.name || '',
  });

  const categories = [
    'education',
    'health',
    'environment',
    'poverty',
    'disaster-relief',
    'other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.title || !formData.description || !formData.goal) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    const campaignData = {
      ...formData,
      goal: parseFloat(formData.goal),
      raised: 0,
      startDate: new Date().toISOString(),
      image: formData.image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800',
    };

    const result = await createCampaign(campaignData);

    if (result.success) {
      navigate('/campaigns');
    } else {
      setError(result.error || 'Failed to create campaign');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Campaign</h1>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Clean Water for Rural Schools"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe your campaign goals, impact, and how funds will be used..."
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-2">
                  Funding Goal (₹) *
                </label>
                <input
                  type="number"
                  id="goal"
                  name="goal"
                  required
                  min="1"
                  value={formData.goal}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="10000"
                />
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Mumbai, Maharashtra, India"
              />
            </div>

            <div>
              <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 mb-2">
                Organization Name
              </label>
              <input
                type="text"
                id="organizationName"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your organization name"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Image URL
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Leave blank to use a default image
              </p>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Campaign'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;
