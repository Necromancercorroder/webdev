import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, User, Users, AlertCircle, Building2, FileText, Upload, X, Check } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'donor',
  });
  const [ngoFormData, setNgoFormData] = useState({
    ngoName: '',
    regNumber: '',
    regDate: '',
    ngoCategory: '',
    ngoCategorySecondary: '',
    address: '',
    website: '',
    facebook: '',
    twitter: '',
    instagram: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    bankAccount: '',
    bankName: '',
    ifscCode: '',
    certFile: null,
    proofFile: null,
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNgoForm, setShowNgoForm] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
    if (e.target.name === 'userType' && e.target.value === 'ngo') {
      setShowNgoForm(false);
    }
  };

  const handleNgoChange = (e) => {
    setNgoFormData({
      ...ngoFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e, fieldName) => {
    setNgoFormData({
      ...ngoFormData,
      [fieldName]: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.userType === 'ngo') {
      setShowNgoForm(true);
      return;
    }

    setLoading(true);

    try {
      const result = await register(
        formData.name,
        formData.email,
        formData.password,
        formData.userType
      );

      if (result.success) {
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 100);
      } else {
        setError(result.error || 'Registration failed. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  const validateStep1 = () => {
    const { ngoName, regNumber, regDate, ngoCategory, address } = ngoFormData;
    if (!ngoName || !regNumber || !regDate || !ngoCategory || !address) {
      setError('Please fill in all required fields.');
      return false;
    }
    setError('');
    return true;
  };

  const validateStep2 = () => {
    const { certFile, proofFile } = ngoFormData;
    if (!certFile || !proofFile) {
      setError('Please upload all required documents.');
      return false;
    }
    setError('');
    return true;
  };

  const validateStep3 = () => {
    const { contactName, contactEmail, contactPhone, bankAccount, bankName, ifscCode } = ngoFormData;
    if (!contactName || !contactEmail || !contactPhone || !bankAccount || !bankName || !ifscCode) {
      setError('Please fill in all required fields.');
      return false;
    }
    setError('');
    return true;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    if (currentStep === 3 && !validateStep3()) return;
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
    setError('');
  };

  const handleNgoSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await register(
        formData.name,
        formData.email,
        formData.password,
        formData.userType
      );

      if (result.success) {
        alert('NGO Registration submitted successfully! Your application will be reviewed.');
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 100);
      } else {
        setError(result.error || 'Registration failed. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {!showNgoForm ? (
        <>
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  <span>{error}</span>
                </div>
              )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Rahul Kumar"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="rahul@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                I am a
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="donor">Donor</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="ngo">NGO</option>
                  <option value="platform_admin">Platform Admin</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating account...' : formData.userType === 'ngo' ? 'Continue to NGO Registration' : 'Create account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">NGO Registration</h2>
          <p className="text-gray-600">Complete your NGO registration in 4 simple steps</p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step < currentStep ? 'bg-green-600' : step === currentStep ? 'bg-blue-600' : 'bg-gray-300'
              } text-white font-bold`}>
                {step < currentStep ? <Check className="w-5 h-5" /> : step}
              </div>
              {step < 4 && (
                <div className={`flex-1 h-1 mx-2 ${
                  step < currentStep ? 'bg-green-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>{error}</span>
          </div>
        )}

        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 1: Basic Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                NGO Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="ngoName"
                value={ngoFormData.ngoName}
                onChange={handleNgoChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter NGO name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Registration Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="regNumber"
                value={ngoFormData.regNumber}
                onChange={handleNgoChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter registration number"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Registration Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="regDate"
                value={ngoFormData.regDate}
                onChange={handleNgoChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                NGO Category <span className="text-red-500">*</span>
              </label>
              <select
                name="ngoCategory"
                value={ngoFormData.ngoCategory}
                onChange={handleNgoChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select category</option>
                <option value="Education">Education</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Environment">Environment</option>
                <option value="Women Empowerment">Women Empowerment</option>
                <option value="Child Welfare">Child Welfare</option>
                <option value="Disaster Relief">Disaster Relief</option>
                <option value="Animal Welfare">Animal Welfare</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secondary Category (Optional)
              </label>
              <select
                name="ngoCategorySecondary"
                value={ngoFormData.ngoCategorySecondary}
                onChange={handleNgoChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select secondary category</option>
                <option value="Education">Education</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Environment">Environment</option>
                <option value="Women Empowerment">Women Empowerment</option>
                <option value="Child Welfare">Child Welfare</option>
                <option value="Disaster Relief">Disaster Relief</option>
                <option value="Animal Welfare">Animal Welfare</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Registered Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                value={ngoFormData.address}
                onChange={handleNgoChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter full registered address"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website (Optional)
              </label>
              <input
                type="url"
                name="website"
                value={ngoFormData.website}
                onChange={handleNgoChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter NGO website"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Social Media Links (Optional)
              </label>
              <div className="space-y-3">
                <input
                  type="url"
                  name="facebook"
                  value={ngoFormData.facebook}
                  onChange={handleNgoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Facebook URL"
                />
                <input
                  type="url"
                  name="twitter"
                  value={ngoFormData.twitter}
                  onChange={handleNgoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Twitter URL"
                />
                <input
                  type="url"
                  name="instagram"
                  value={ngoFormData.instagram}
                  onChange={handleNgoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Instagram URL"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Registration Documents */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 2: Registration Documents</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Registration Certificate <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-2">Drag and drop files here or click to upload</p>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, 'certFile')}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  id="certFile"
                  required
                />
                <label
                  htmlFor="certFile"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
                >
                  Choose File
                </label>
                {ngoFormData.certFile && (
                  <p className="mt-2 text-sm text-green-600">✓ {ngoFormData.certFile.name}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Proof of Address <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-2">Drag and drop files here or click to upload</p>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, 'proofFile')}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  id="proofFile"
                  required
                />
                <label
                  htmlFor="proofFile"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
                >
                  Choose File
                </label>
                {ngoFormData.proofFile && (
                  <p className="mt-2 text-sm text-green-600">✓ {ngoFormData.proofFile.name}</p>
                )}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Contact & Bank Details */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 3: Contact & Bank Details</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Person Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="contactName"
                value={ngoFormData.contactName}
                onChange={handleNgoChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter contact person name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Person Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="contactEmail"
                value={ngoFormData.contactEmail}
                onChange={handleNgoChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter contact person email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Person Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="contactPhone"
                value={ngoFormData.contactPhone}
                onChange={handleNgoChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter contact person phone"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bank Account Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="bankAccount"
                value={ngoFormData.bankAccount}
                onChange={handleNgoChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter bank account number"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bank Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="bankName"
                value={ngoFormData.bankName}
                onChange={handleNgoChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter bank name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                IFSC Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="ifscCode"
                value={ngoFormData.ifscCode}
                onChange={handleNgoChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter IFSC code"
                required
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Preview & Submit */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 4: Preview & Submit</h3>

            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">NGO Name</p>
                  <p className="font-medium text-gray-900">{ngoFormData.ngoName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Registration Number</p>
                  <p className="font-medium text-gray-900">{ngoFormData.regNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Registration Date</p>
                  <p className="font-medium text-gray-900">{ngoFormData.regDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-medium text-gray-900">{ngoFormData.ngoCategory}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium text-gray-900">{ngoFormData.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Contact Person</p>
                  <p className="font-medium text-gray-900">{ngoFormData.contactName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Contact Email</p>
                  <p className="font-medium text-gray-900">{ngoFormData.contactEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Contact Phone</p>
                  <p className="font-medium text-gray-900">{ngoFormData.contactPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Bank Name</p>
                  <p className="font-medium text-gray-900">{ngoFormData.bankName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Account Number</p>
                  <p className="font-medium text-gray-900">{ngoFormData.bankAccount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">IFSC Code</p>
                  <p className="font-medium text-gray-900">{ngoFormData.ifscCode}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNgoSubmit}
                disabled={loading}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Registration'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )}
    </div>
  );
};

export default Register;
