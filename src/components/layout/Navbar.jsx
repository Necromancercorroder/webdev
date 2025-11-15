import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, User, LogOut, LayoutDashboard, Users, Shield, UserPlus, Plus, FileText } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">Social Impact</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {/* Public links - hidden for volunteers */}
            {user?.userType !== 'volunteer' && (
              <>
                <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                <Link to="/campaigns" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Campaigns
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  About
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Contact
                </Link>
              </>
            )}

            {isAuthenticated ? (
              <>
                {/* Volunteer-specific navigation */}
                {user?.userType === 'volunteer' && (
                  <>
                    <Link
                      to="/volunteer-application"
                      className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      <FileText className="w-4 h-4 mr-1" />
                      NGO Review Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      <User className="w-4 h-4 mr-1" />
                      {user?.name}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      <LogOut className="w-4 h-4 mr-1" />
                      Logout
                    </button>
                  </>
                )}

                {/* Non-volunteer navigation */}
                {user?.userType !== 'volunteer' && (
                  <>
                    <Link
                      to="/dashboard"
                      className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      <LayoutDashboard className="w-4 h-4 mr-1" />
                      Dashboard
                    </Link>
                {user?.userType === 'ngo' && (
                  <>
                    <Link
                      to="/create-campaign"
                      className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Create Campaign
                    </Link>
                    <Link
                      to="/admin"
                      className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      <Users className="w-4 h-4 mr-1" />
                      Admin Panel
                    </Link>
                  </>
                )}
                {user?.userType === 'platform_admin' && (
                  <Link
                    to="/platform-admin"
                    className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <Shield className="w-4 h-4 mr-1" />
                    Platform Admin
                  </Link>
                )}
                {user?.userType === 'donor' && (
                  <Link
                    to="/volunteer-application"
                    className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <UserPlus className="w-4 h-4 mr-1" />
                    Volunteer Portal
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <User className="w-4 h-4 mr-1" />
                  {user?.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </button>
                  </>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Public links - hidden for volunteers */}
            {user?.userType !== 'volunteer' && (
              <>
                <Link
                  to="/"
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/campaigns"
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Campaigns
                </Link>
                <Link
                  to="/about"
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </>
            )}

            {isAuthenticated ? (
              <>
                {/* Volunteer-specific mobile nav */}
                {user?.userType === 'volunteer' && (
                  <>
                    <Link
                      to="/volunteer-application"
                      className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      NGO Review Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="text-red-600 hover:text-red-700 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                    >
                      Logout
                    </button>
                  </>
                )}

                {/* Non-volunteer mobile nav */}
                {user?.userType !== 'volunteer' && (
                  <>
                    <Link
                      to="/dashboard"
                      className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                {user?.userType === 'ngo' && (
                  <>
                    <Link
                      to="/create-campaign"
                      className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Create Campaign
                    </Link>
                    <Link
                      to="/admin"
                      className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  </>
                )}
                {user?.userType === 'donor' && (
                  <Link
                    to="/volunteer-application"
                    className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Volunteer Portal
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="text-red-600 hover:text-red-700 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                >
                  Logout
                </button>
                  </>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
