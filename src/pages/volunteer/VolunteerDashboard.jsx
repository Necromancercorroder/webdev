import React from 'react';
import Card from '../../components/volunteer/Card';

const VolunteerDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Volunteer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card title="Assigned Tasks Today" value="5" />
        <Card title="Pending Verifications" value="3" />
        <Card title="Completed" value="10" />
        <Card title="Flagged" value="2" />
        <Card title="Total Volunteering Hours" value="50" />
        <Card title="Badge Level" value="Gold" />
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow p-4">
          <ul className="space-y-3">
            <li className="flex justify-between items-center border-b pb-2">
              <span>Task Assigned - Verify NGO Purchase</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </li>
            <li className="flex justify-between items-center border-b pb-2">
              <span>Verification Completed - Campaign #123</span>
              <span className="text-sm text-gray-500">5 hours ago</span>
            </li>
            <li className="flex justify-between items-center">
              <span>New Badge Earned - Gold Level</span>
              <span className="text-sm text-gray-500">1 day ago</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">New Tasks Assigned</h2>
        <div className="bg-white rounded-lg shadow p-4">
          <ul className="space-y-3">
            <li className="flex justify-between items-center border-b pb-2">
              <div>
                <span className="font-semibold">Verify Purchase - Educational Supplies</span>
                <p className="text-sm text-gray-600">NGO: Hope Foundation</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                View Details
              </button>
            </li>
            <li className="flex justify-between items-center border-b pb-2">
              <div>
                <span className="font-semibold">Verify Campaign Documentation</span>
                <p className="text-sm text-gray-600">NGO: Clean Water Initiative</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                View Details
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
