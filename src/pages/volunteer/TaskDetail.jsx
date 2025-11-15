import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Camera, FileText, Upload, AlertTriangle } from 'lucide-react';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [verificationData, setVerificationData] = useState({
    quantityMatch: null,
    correctItem: null,
    qualityCheck: null,
    receiptsProvided: null,
    notes: '',
    photos: []
  });

  // Mock task data (in real app, fetch based on id)
  const task = {
    id: id || 'VT-001',
    purchaseId: 'PUR-2024-001',
    ngoName: 'Hope Foundation India',
    vendorName: 'Sunshine Suppliers',
    itemName: 'Educational Books',
    quantity: 500,
    amount: 25000,
    location: 'Andheri, Mumbai',
    deadline: '2024-11-20',
    status: 'pending',
    priority: 'high',
    assignedDate: '2024-11-14',
    description: 'Verify delivery of 500 educational books for primary school children',
    deliveryAddress: '123 School Road, Andheri West, Mumbai 400058',
    contactPerson: 'Rajesh Kumar',
    contactPhone: '+91 98765 43210'
  };

  const checklist = [
    { id: 'quantityMatch', label: 'Item quantity matches invoice', key: 'quantityMatch' },
    { id: 'correctItem', label: 'Correct item delivered as per order', key: 'correctItem' },
    { id: 'qualityCheck', label: 'Quality of items is satisfactory', key: 'qualityCheck' },
    { id: 'receiptsProvided', label: 'Receipts and invoices provided', key: 'receiptsProvided' }
  ];

  const handleChecklistChange = (key, value) => {
    setVerificationData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setVerificationData(prev => ({
      ...prev,
      photos: [...prev.photos, ...files]
    }));
  };

  const handleSubmit = (action) => {
    const allChecked = checklist.every(item => verificationData[item.key] !== null);
    if (!allChecked && action === 'approve') {
      alert('Please complete all checklist items before approving');
      return;
    }

    if (action === 'flag' && !verificationData.notes) {
      alert('Please provide notes explaining why this task is being flagged');
      return;
    }

    alert(`Task ${action === 'approve' ? 'approved' : 'flagged'} successfully!`);
    navigate('/volunteer-application/assigned-tasks');
  };

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/volunteer-application/assigned-tasks')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Tasks
        </button>

        {/* Task Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{task.itemName}</h1>
              <p className="text-gray-600">Task ID: {task.id} • Purchase ID: {task.purchaseId}</p>
            </div>
            <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full font-semibold">
              Pending Verification
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">NGO Details</h3>
              <p className="text-gray-900 font-medium mb-1">{task.ngoName}</p>
              <p className="text-gray-600 text-sm">{task.contactPerson}</p>
              <p className="text-gray-600 text-sm">{task.contactPhone}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Vendor Details</h3>
              <p className="text-gray-900 font-medium mb-1">{task.vendorName}</p>
              <p className="text-gray-600 text-sm">{task.location}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Order Details</h3>
              <p className="text-gray-900"><span className="font-medium">Quantity:</span> {task.quantity} units</p>
              <p className="text-gray-900"><span className="font-medium">Amount:</span> ₹{task.amount.toLocaleString('en-IN')}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Delivery Address</h3>
              <p className="text-gray-900 text-sm">{task.deliveryAddress}</p>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3>
              <p className="text-gray-900">{task.description}</p>
            </div>
          </div>
        </div>

        {/* Verification Checklist */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Verification Checklist</h2>
          <div className="space-y-4">
            {checklist.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-3">{item.label}</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleChecklistChange(item.key, true)}
                    className={`flex-1 py-2 px-4 rounded-lg border-2 transition ${
                      verificationData[item.key] === true
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-300 text-gray-700 hover:border-green-500'
                    }`}
                  >
                    <CheckCircle className={`w-5 h-5 mx-auto ${verificationData[item.key] === true ? 'text-green-600' : 'text-gray-400'}`} />
                    <span className="text-sm font-medium">Yes</span>
                  </button>
                  <button
                    onClick={() => handleChecklistChange(item.key, false)}
                    className={`flex-1 py-2 px-4 rounded-lg border-2 transition ${
                      verificationData[item.key] === false
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-300 text-gray-700 hover:border-red-500'
                    }`}
                  >
                    <XCircle className={`w-5 h-5 mx-auto ${verificationData[item.key] === false ? 'text-red-600' : 'text-gray-400'}`} />
                    <span className="text-sm font-medium">No</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Upload */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Upload Photos</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Upload photos of the delivered items and receipts</p>
            <label className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
              <Upload className="w-5 h-5" />
              Choose Photos
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
            {verificationData.photos.length > 0 && (
              <p className="text-sm text-green-600 mt-4">
                {verificationData.photos.length} photo(s) uploaded
              </p>
            )}
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Notes & Comments</h2>
          <textarea
            value={verificationData.notes}
            onChange={(e) => setVerificationData(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="Add any additional notes or observations..."
            rows="5"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex gap-4">
            <button
              onClick={() => handleSubmit('approve')}
              className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Approve Verification
            </button>
            <button
              onClick={() => handleSubmit('flag')}
              className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
            >
              <AlertTriangle className="w-5 h-5" />
              Flag Issue
            </button>
            <button
              onClick={() => navigate('/volunteer-application/assigned-tasks')}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
