import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { DollarSign, CreditCard, Users, TrendingUp, Download, Search, Calendar, BarChart3, PieChart } from 'lucide-react';

const AdminPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMethod, setFilterMethod] = useState('all');
  const [selectedView, setSelectedView] = useState('overview'); // overview, transactions, campaigns

  useEffect(() => {
    // Check if user is NGO
    if (!user || user.userType !== 'ngo') {
      navigate('/dashboard');
      return;
    }
    loadAdminData();
  }, [user, navigate]);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      // Fetch all donations
      const donationsRes = await fetch('http://localhost:5000/api/donations');
      const donationsData = await donationsRes.json();
      if (donationsData.success) {
        setDonations(donationsData.donations);
      }

      // Fetch all campaigns
      const campaignsRes = await fetch('http://localhost:5000/api/campaigns');
      const campaignsData = await campaignsRes.json();
      if (campaignsData.success) {
        setCampaigns(campaignsData.campaigns);
      }

      // Fetch all volunteers
      const volunteersRes = await fetch('http://localhost:5000/api/volunteers');
      const volunteersData = await volunteersRes.json();
      if (volunteersData.success) {
        setVolunteers(volunteersData.volunteers);
      }
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = 
      donation.transactionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.userName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterMethod === 'all' || donation.paymentMethod === filterMethod;
    return matchesSearch && matchesFilter;
  });

  const totalDonations = donations.reduce((sum, d) => sum + (d.amount || 0), 0);
  const uniqueDonors = new Set(donations.map(d => d.userId)).size;
  const paymentMethods = [...new Set(donations.map(d => d.paymentMethod))].filter(Boolean);
  const avgDonation = donations.length > 0 ? totalDonations / donations.length : 0;
  
  // Payment method breakdown
  const paymentBreakdown = paymentMethods.map(method => ({
    method,
    count: donations.filter(d => d.paymentMethod === method).length,
    amount: donations.filter(d => d.paymentMethod === method).reduce((sum, d) => sum + (d.amount || 0), 0)
  }));

  // Top campaigns by donations
  const campaignStats = campaigns.map(campaign => {
    const campaignDonations = donations.filter(d => d.campaignId === campaign.id);
    const campaignVolunteers = volunteers.filter(v => v.campaignId === campaign.id);
    return {
      ...campaign,
      donationCount: campaignDonations.length,
      donationAmount: campaignDonations.reduce((sum, d) => sum + (d.amount || 0), 0),
      volunteerCount: campaignVolunteers.length
    };
  }).sort((a, b) => b.donationAmount - a.donationAmount);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-xl text-gray-600">Payment & Donation Management</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setSelectedView('overview')}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                selectedView === 'overview'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <BarChart3 className="w-5 h-5 inline-block mr-2" />
              Overview & Statistics
            </button>
            <button
              onClick={() => setSelectedView('transactions')}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                selectedView === 'transactions'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <CreditCard className="w-5 h-5 inline-block mr-2" />
              Transactions
            </button>
            <button
              onClick={() => setSelectedView('campaigns')}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                selectedView === 'campaigns'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <TrendingUp className="w-5 h-5 inline-block mr-2" />
              Campaign Performance
            </button>
          </div>
        </div>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Donations</p>
                <p className="text-3xl font-bold text-gray-900">${totalDonations.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Transactions</p>
                <p className="text-3xl font-bold text-gray-900">{donations.length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CreditCard className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Unique Donors</p>
                <p className="text-3xl font-bold text-gray-900">{uniqueDonors}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg Donation</p>
                <p className="text-3xl font-bold text-gray-900">${avgDonation.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <PieChart className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Volunteers</p>
                <p className="text-3xl font-bold text-gray-900">{volunteers.length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Overview Statistics */}
        {selectedView === 'overview' && (
          <>
            {/* Payment Method Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Payment Method Distribution</h3>
                <div className="space-y-4">
                  {paymentBreakdown.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-700">{item.method?.toUpperCase() || 'Unknown'}</span>
                        <span className="text-sm text-gray-600">{item.count} transactions</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-blue-600 h-3 rounded-full transition-all"
                          style={{ width: `${(item.amount / totalDonations) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-sm text-gray-600">${item.amount.toLocaleString()}</span>
                        <span className="text-sm font-semibold text-blue-600">
                          {((item.amount / totalDonations) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {donations.slice(0, 5).map((donation, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <DollarSign className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{donation.userName}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(donation.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">${donation.amount}</p>
                        <p className="text-xs text-gray-500">{donation.paymentMethod}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Campaigns */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Top Performing Campaigns</h3>
              <div className="space-y-4">
                {campaignStats.slice(0, 5).map((campaign, index) => (
                  <div key={campaign.id} className="border-b border-gray-200 pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mr-3">
                          #{index + 1}
                        </span>
                        <div>
                          <h4 className="font-semibold text-gray-900">{campaign.title}</h4>
                          <p className="text-sm text-gray-500">{campaign.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">${campaign.donationAmount.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">{campaign.donationCount} donations</p>
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <span className="text-gray-600">
                        <Users className="w-4 h-4 inline mr-1" />
                        {campaign.volunteerCount} volunteers
                      </span>
                      <span className="text-gray-600">
                        Goal: ${campaign.goal.toLocaleString()}
                      </span>
                      <span className="text-blue-600 font-semibold">
                        {Math.round((campaign.raised / campaign.goal) * 100)}% achieved
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Transactions View */}
        {selectedView === 'transactions' && (
          <>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by Transaction ID or Donor Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <select
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Payment Methods</option>
              {paymentMethods.map(method => (
                <option key={method} value={method}>
                  {method?.toUpperCase() || 'Unknown'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Donations Table */}
        {/* Donations Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Payment Transactions</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Donor Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDonations.length > 0 ? (
                  filteredDonations.map((donation, index) => (
                    <tr key={donation.id || index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <CreditCard className="w-5 h-5 text-blue-600 mr-2" />
                          <span className="text-sm font-medium text-gray-900">
                            {donation.transactionId || 'N/A'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{donation.userName || 'Anonymous'}</div>
                        <div className="text-sm text-gray-500">ID: {donation.userId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-green-600">
                          ${donation.amount?.toLocaleString() || '0'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {donation.paymentMethod?.toUpperCase() || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(donation.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {donation.paymentStatus || 'COMPLETED'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
          </>
        )}

        {/* Campaign Performance View */}
        {selectedView === 'campaigns' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Campaign Performance Analysis</h2>
            <div className="space-y-6">
              {campaignStats.map((campaign) => (
                <div key={campaign.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{campaign.title}</h3>
                      <p className="text-gray-600 mt-1">{campaign.description?.substring(0, 100)}...</p>
                      <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                        {campaign.category}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Created</p>
                      <p className="font-semibold">{new Date(campaign.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Total Raised</p>
                      <p className="text-2xl font-bold text-green-600">${campaign.donationAmount.toLocaleString()}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Donations</p>
                      <p className="text-2xl font-bold text-blue-600">{campaign.donationCount}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Volunteers</p>
                      <p className="text-2xl font-bold text-purple-600">{campaign.volunteerCount}</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Goal Progress</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {Math.round((campaign.raised / campaign.goal) * 100)}%
                      </p>
                    </div>
                  </div>

                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress to Goal</span>
                      <span className="font-semibold">
                        ${campaign.raised?.toLocaleString() || 0} / ${campaign.goal.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all"
                        style={{ width: `${Math.min((campaign.raised / campaign.goal) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Export Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => alert('Export feature coming soon!')}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            <Download className="w-5 h-5 mr-2" />
            Export to CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
