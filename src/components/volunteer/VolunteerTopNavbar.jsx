import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const VolunteerTopNavbar = () => {
  const { user } = useAuth();
  
  return (
    <div className="bg-blue-600 text-white p-4 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Volunteer Panel</h1>
        <div className="text-sm">
          Welcome, <span className="font-semibold">{user?.name || 'Volunteer'}</span>
        </div>
      </div>
    </div>
  );
};

export default VolunteerTopNavbar;
