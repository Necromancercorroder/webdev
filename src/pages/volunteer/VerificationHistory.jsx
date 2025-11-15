import React from 'react';
import { CheckCircle, XCircle, Calendar, Package } from 'lucide-react';

const VerificationHistory = () => {
  const history = [
    {
      id: 'VH-001',
      taskId: 'VT-003',
      itemName: 'Sewing Machines',
      ngoName: 'Women Empowerment Society',
      date: '2024-11-14',
      status: 'approved',
      notes: 'All items delivered in perfect condition'
    },
    {
      id: 'VH-002',
      taskId: 'VT-002',
      itemName: 'Medical Supplies',
      ngoName: 'Health for All Foundation',
      date: '2024-11-12',
      status: 'approved',
      notes: 'Verified all quantities and quality standards'
    },
    {
      id: 'VH-003',
      taskId: 'VT-001',
      itemName: 'Food Packets',
      ngoName: 'Feed the Hungry',
      date: '2024-11-10',
      status: 'flagged',
      notes: 'Quantity mismatch - 50 packets short'
    }
  ];

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Verification History</h1>
        <p className="text-gray-600">View your past verification activities</p>
      </div>

      <div className="space-y-4">
        {history.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{item.itemName}</h3>
                <p className="text-sm text-gray-600">{item.ngoName}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                item.status === 'approved' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {item.status === 'approved' ? (
                  <><CheckCircle className="w-4 h-4 inline mr-1" />Approved</>
                ) : (
                  <><XCircle className="w-4 h-4 inline mr-1" />Flagged</>
                )}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {new Date(item.date).toLocaleDateString('en-IN')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Task ID: {item.taskId}</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm font-semibold text-gray-700 mb-1">Notes:</p>
              <p className="text-sm text-gray-600">{item.notes}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerificationHistory;
