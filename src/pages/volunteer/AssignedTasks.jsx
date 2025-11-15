import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, AlertCircle, Calendar, MapPin, Package, Eye } from 'lucide-react';

const AssignedTasks = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all'); // all, pending, completed, flagged

  const tasks = [
    {
      id: 'VT-001',
      purchaseId: 'PUR-2024-001',
      ngoName: 'Hope Foundation India',
      vendorName: 'Sunshine Suppliers',
      itemName: 'Educational Books',
      quantity: 500,
      location: 'Andheri, Mumbai',
      deadline: '2024-11-20',
      status: 'pending',
      priority: 'high',
      assignedDate: '2024-11-14'
    },
    {
      id: 'VT-002',
      purchaseId: 'PUR-2024-002',
      ngoName: 'Green Earth Initiative',
      vendorName: 'Eco Products Ltd',
      itemName: 'Recycling Bins',
      quantity: 100,
      location: 'Connaught Place, Delhi',
      deadline: '2024-11-18',
      status: 'pending',
      priority: 'medium',
      assignedDate: '2024-11-13'
    },
    {
      id: 'VT-003',
      purchaseId: 'PUR-2024-003',
      ngoName: 'Women Empowerment Society',
      vendorName: 'Skill Training Supplies',
      itemName: 'Sewing Machines',
      quantity: 25,
      location: 'Koramangala, Bangalore',
      deadline: '2024-11-15',
      status: 'completed',
      priority: 'medium',
      assignedDate: '2024-11-10',
      completedDate: '2024-11-14'
    },
    {
      id: 'VT-004',
      purchaseId: 'PUR-2024-004',
      ngoName: 'Child Care Foundation',
      vendorName: 'Food Distributors Inc',
      itemName: 'Nutrition Packets',
      quantity: 1000,
      location: 'Salt Lake, Kolkata',
      deadline: '2024-11-16',
      status: 'flagged',
      priority: 'high',
      assignedDate: '2024-11-12',
      flagReason: 'Quantity mismatch - only 850 packets delivered'
    }
  ];

  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks.filter(task => task.status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'flagged': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Assigned Tasks</h1>
        <p className="text-gray-600">Verify NGO purchases and deliveries</p>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-4 font-semibold transition-colors ${
              filter === 'all'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            All Tasks ({tasks.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-6 py-4 font-semibold transition-colors ${
              filter === 'pending'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            Pending ({tasks.filter(t => t.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-6 py-4 font-semibold transition-colors ${
              filter === 'completed'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            Completed ({tasks.filter(t => t.status === 'completed').length})
          </button>
          <button
            onClick={() => setFilter('flagged')}
            className={`px-6 py-4 font-semibold transition-colors ${
              filter === 'flagged'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            Flagged ({tasks.filter(t => t.status === 'flagged').length})
          </button>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredTasks.map(task => (
          <div key={task.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{task.itemName}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Task ID: {task.id} • Purchase ID: {task.purchaseId}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold ${getPriorityColor(task.priority)}`}>
                  {task.priority.toUpperCase()} PRIORITY
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">NGO</p>
                <p className="font-semibold text-gray-900">{task.ngoName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Vendor</p>
                <p className="font-semibold text-gray-900">{task.vendorName}</p>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Quantity</p>
                  <p className="font-semibold text-gray-900">{task.quantity} units</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-semibold text-gray-900">{task.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Deadline</p>
                  <p className="font-semibold text-gray-900">{new Date(task.deadline).toLocaleDateString('en-IN')}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Assigned Date</p>
                  <p className="font-semibold text-gray-900">{new Date(task.assignedDate).toLocaleDateString('en-IN')}</p>
                </div>
              </div>
            </div>

            {task.status === 'flagged' && task.flagReason && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-red-900">Flag Reason:</p>
                    <p className="text-sm text-red-800">{task.flagReason}</p>
                  </div>
                </div>
              </div>
            )}

            {task.status === 'completed' && task.completedDate && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-sm text-green-800">
                    Completed on {new Date(task.completedDate).toLocaleDateString('en-IN')}
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/volunteer-application/task-detail/${task.id}`)}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>
              {task.status === 'pending' && (
                <button
                  onClick={() => navigate(`/volunteer-application/task-detail/${task.id}`)}
                  className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
                >
                  Start Verification
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-600">There are no {filter !== 'all' ? filter : ''} tasks at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default AssignedTasks;
