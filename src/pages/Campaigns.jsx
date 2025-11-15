import React, { useState } from 'react';
import { useCampaigns } from '../contexts/CampaignContext';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';

const Campaigns = () => {
  const { campaigns, loading } = useCampaigns();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'education', 'health', 'environment', 'poverty', 'disaster-relief', 'other'];

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || campaign.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Campaigns</h1>
          <p className="text-xl text-gray-600">Discover meaningful causes and make a difference</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Campaign Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCampaigns.map((campaign) => (
              <Link
                key={campaign.id}
                to={`/campaigns/${campaign.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={campaign.image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800'}
                  alt={campaign.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-2">
                    {campaign.category}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{campaign.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{campaign.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold">
                        {Math.round((campaign.raised / campaign.goal) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${Math.min((campaign.raised / campaign.goal) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Raised: <strong>₹{campaign.raised?.toLocaleString() || 0}</strong>
                    </span>
                    <span className="text-gray-600">
                      Goal: <strong>₹{campaign.goal?.toLocaleString() || 0}</strong>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 text-lg">No campaigns found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Campaigns;
