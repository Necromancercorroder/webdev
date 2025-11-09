import React, { useState } from 'react';
import { MapPin, TrendingDown, Users, DollarSign } from 'lucide-react';

const PovertyMap = () => {
  const [selectedState, setSelectedState] = useState(null);

  // Poverty rate data for Indian states (sample data - replace with real data)
  const povertyData = {
    'Andhra Pradesh': { rate: 9.2, population: 53903393, poor: 4959112 },
    'Arunachal Pradesh': { rate: 34.7, population: 1570458, poor: 544949 },
    'Assam': { rate: 31.9, population: 35607039, poor: 11358646 },
    'Bihar': { rate: 33.7, population: 124799926, poor: 42057575 },
    'Chhattisgarh': { rate: 39.9, population: 29436231, population: 11747048 },
    'Goa': { rate: 5.1, population: 1542750, poor: 78680 },
    'Gujarat': { rate: 16.6, population: 63872399, poor: 10602878 },
    'Haryana': { rate: 11.2, population: 28204692, poor: 3158926 },
    'Himachal Pradesh': { rate: 8.1, population: 7451955, poor: 603608 },
    'Jharkhand': { rate: 36.9, population: 38593948, poor: 14241167 },
    'Karnataka': { rate: 20.9, population: 67562686, poor: 14120601 },
    'Kerala': { rate: 7.1, population: 35699443, poor: 2534661 },
    'Madhya Pradesh': { rate: 36.7, population: 85358965, poor: 31326740 },
    'Maharashtra': { rate: 17.4, population: 123144223, poor: 21427095 },
    'Manipur': { rate: 36.9, population: 3091545, poor: 1140800 },
    'Meghalaya': { rate: 11.9, population: 3366710, poor: 400639 },
    'Mizoram': { rate: 20.4, population: 1239244, poor: 252806 },
    'Nagaland': { rate: 18.9, population: 2249695, poor: 425192 },
    'Odisha': { rate: 32.6, population: 46356334, poor: 15112164 },
    'Punjab': { rate: 8.3, population: 29859154, poor: 2478310 },
    'Rajasthan': { rate: 14.7, population: 77264465, poor: 11357877 },
    'Sikkim': { rate: 8.2, population: 690251, poor: 56601 },
    'Tamil Nadu': { rate: 11.3, population: 76481545, poor: 8642415 },
    'Telangana': { rate: 9.2, population: 39362732, poor: 3621371 },
    'Tripura': { rate: 14.1, population: 4169794, poor: 587941 },
    'Uttar Pradesh': { rate: 29.4, population: 224979129, poor: 66143863 },
    'Uttarakhand': { rate: 11.3, population: 11250858, poor: 1271347 },
    'West Bengal': { rate: 19.9, population: 99609303, poor: 19822251 },
    'Delhi': { rate: 9.9, population: 18710922, poor: 1852381 },
  };

  // Color scale based on poverty rate
  const getColor = (rate) => {
    if (rate >= 35) return '#7f1d1d'; // Dark red - Very High
    if (rate >= 25) return '#dc2626'; // Red - High
    if (rate >= 15) return '#f97316'; // Orange - Medium
    if (rate >= 10) return '#fbbf24'; // Yellow - Low
    return '#22c55e'; // Green - Very Low
  };

  const stats = {
    avgPoverty: (Object.values(povertyData).reduce((sum, s) => sum + s.rate, 0) / Object.keys(povertyData).length).toFixed(1),
    highestState: Object.entries(povertyData).reduce((max, [state, data]) => data.rate > max[1].rate ? [state, data] : max),
    lowestState: Object.entries(povertyData).reduce((min, [state, data]) => data.rate < min[1].rate ? [state, data] : min),
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">India Poverty Map</h1>
          <p className="text-xl text-gray-600">State-wise Poverty Rate Analysis</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Average Poverty Rate</p>
                <p className="text-3xl font-bold text-blue-600">{stats.avgPoverty}%</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <TrendingDown className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Highest Poverty</p>
                <p className="text-lg font-bold text-red-600">{stats.highestState[0]}</p>
                <p className="text-2xl font-bold text-red-600">{stats.highestState[1].rate}%</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <MapPin className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Lowest Poverty</p>
                <p className="text-lg font-bold text-green-600">{stats.lowestState[0]}</p>
                <p className="text-2xl font-bold text-green-600">{stats.lowestState[1].rate}%</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Map and Data Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Visualization */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Interactive Poverty Map</h2>
            
            {/* Legend */}
            <div className="mb-4 flex flex-wrap gap-2">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded" style={{ backgroundColor: '#22c55e' }}></div>
                <span className="ml-2 text-sm text-gray-600">&lt; 10%</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded" style={{ backgroundColor: '#fbbf24' }}></div>
                <span className="ml-2 text-sm text-gray-600">10-15%</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded" style={{ backgroundColor: '#f97316' }}></div>
                <span className="ml-2 text-sm text-gray-600">15-25%</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded" style={{ backgroundColor: '#dc2626' }}></div>
                <span className="ml-2 text-sm text-gray-600">25-35%</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded" style={{ backgroundColor: '#7f1d1d' }}></div>
                <span className="ml-2 text-sm text-gray-600">&gt; 35%</span>
              </div>
            </div>

            {/* Interactive SVG India Map */}
            <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 min-h-[600px] flex items-center justify-center">
              <svg
                viewBox="0 0 800 900"
                className="w-full h-full max-w-2xl"
                style={{ maxHeight: '700px' }}
              >
                {/* Jammu & Kashmir */}
                <path
                  d="M 200 50 L 250 40 L 280 60 L 290 90 L 270 110 L 240 100 L 210 80 Z"
                  fill={selectedState === 'Jammu & Kashmir' ? '#3b82f6' : getColor(15.0)}
                  stroke="#fff"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setSelectedState('Jammu & Kashmir')}
                />
                
                {/* Himachal Pradesh */}
                <path
                  d="M 240 100 L 270 110 L 290 130 L 280 150 L 250 140 L 230 120 Z"
                  fill={selectedState === 'Himachal Pradesh' ? '#3b82f6' : getColor(8.1)}
                  stroke="#fff"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setSelectedState('Himachal Pradesh')}
                />
                
                {/* Punjab */}
                <path
                  d="M 210 130 L 250 140 L 260 160 L 240 170 L 210 160 Z"
                  fill={selectedState === 'Punjab' ? '#3b82f6' : getColor(8.3)}
                  stroke="#fff"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setSelectedState('Punjab')}
                />
                
                {/* Haryana & Delhi */}
                <path
                  d="M 240 170 L 260 160 L 280 180 L 270 200 L 250 190 Z"
                  fill={selectedState === 'Haryana' ? '#3b82f6' : getColor(11.2)}
                  stroke="#fff"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setSelectedState('Haryana')}
                />
                <circle
                  cx="260"
                  cy="185"
                  r="8"
                  fill={selectedState === 'Delhi' ? '#3b82f6' : getColor(9.9)}
                  stroke="#fff"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setSelectedState('Delhi')}
                />
                
                {/* Uttarakhand */}
                <path
                  d="M 280 150 L 310 140 L 330 160 L 320 180 L 290 170 Z"
                  fill={selectedState === 'Uttarakhand' ? '#3b82f6' : getColor(11.3)}
                  stroke="#fff"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setSelectedState('Uttarakhand')}
                />
                
                {/* Rajasthan */}
                <path
                  d="M 180 180 L 250 190 L 260 250 L 240 280 L 200 290 L 160 260 L 170 220 Z"
                  fill={selectedState === 'Rajasthan' ? '#3b82f6' : getColor(14.7)}
                  stroke="#fff"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setSelectedState('Rajasthan')}
                />
                
                {/* Uttar Pradesh */}
                <path
                  d="M 270 200 L 320 180 L 380 190 L 390 240 L 360 260 L 320 250 L 280 240 L 260 220 Z"
                  fill={selectedState === 'Uttar Pradesh' ? '#3b82f6' : getColor(29.4)}
                  stroke="#fff"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setSelectedState('Uttar Pradesh')}
                />
                
                {/* Gujarat */}
                <path
                  d="M 140 280 L 200 290 L 220 340 L 200 380 L 160 390 L 120 360 L 110 320 Z"
                  fill={selectedState === 'Gujarat' ? '#3b82f6' : getColor(16.6)}
                  stroke="#fff"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setSelectedState('Gujarat')}
                />
                
                {/* Madhya Pradesh */}
                <path
                  d="M 240 280 L 320 250 L 360 260 L 380 300 L 360 340 L 320 350 L 280 340 L 250 320 Z"
                  fill={selectedState === 'Madhya Pradesh' ? '#3b82f6' : getColor(36.7)}
                  stroke="#fff"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setSelectedState('Madhya Pradesh')}
                />
                
                {/* Bihar */}
                <path
                  d="M 390 240 L 440 230 L 470 250 L 460 280 L 430 290 L 400 270 Z"
                  fill={selectedState === 'Bihar' ? '#3b82f6' : getColor(33.7)}
                  stroke="#fff"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setSelectedState('Bihar')}
                />
                
                {/* Jharkhand */}
                <path
                  d="M 430 290 L 470 280 L 490 310 L 480 340 L 450 350 L 420 330 Z"
                  fill={selectedState === 'Jharkhand' ? '#3b82f6' : getColor(36.9)}
                  stroke="#fff"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setSelectedState('Jharkhand')}
                />
                
                {/* West Bengal */}
                <path
                  d="M 470 250 L 520 240 L 540 270 L 530 310 L 500 320 L 480 300 Z"
                  fill={selectedState === 'West Bengal' ? '#3b82f6' : getColor(19.9)}
                  stroke="#fff"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setSelectedState('West Bengal')}
                />
                
                {/* Odisha */}
                <path
                  d="M 450 350 L 490 340 L 510 370 L 500 410 L 460 420 L 430 390 Z"
                  fill={selectedState === 'Odisha' ? '#3b82f6' : getColor(32.6)}
                  stroke="#fff"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setSelectedState('Odisha')}
                />
                
                {/* Chhattisgarh */}
                <path
                  d="M 380 300 L 430 290 L 450 330 L 440 370 L 400 380 L 370 350 Z"
                  fill={selectedState === 'Chhattisgarh' ? '#3b82f6' : getColor(39.9)}
                  stroke="#fff"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setSelectedState('Chhattisgarh')}
                />
                
                {/* Maharashtra */}
                <path
                  d="M 220 380 L 280 370 L 320 380 L 340 420 L 320 470 L 270 480 L 230 450 L 210 420 Z"
                  fill={selectedState === 'Maharashtra' ? '#3b82f6' : getColor(17.4)}
                  stroke="#fff"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setSelectedState('Maharashtra')}
                />
                
                {/* Goa */}
                <path
                  d="M 200 470 L 230 480 L 225 500 L 195 490 Z"
                  fill={selectedState === 'Goa' ? '#3b82f6' : getColor(5.1)}
                  stroke="#fff"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setSelectedState('Goa')}
                />
                
                {/* Karnataka */}
                <path
                  d="M 230 480 L 280 490 L 290 540 L 270 580 L 230 570 L 200 540 Z"
                  fill={selectedState === 'Karnataka' ? '#3b82f6' : getColor(20.9)}
                  stroke="#fff"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setSelectedState('Karnataka')}
                />
                
                {/* Telangana */}
                <path
                  d="M 320 420 L 360 410 L 380 450 L 370 480 L 340 470 Z"
                  fill={selectedState === 'Telangana' ? '#3b82f6' : getColor(9.2)}
                  stroke="#fff"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setSelectedState('Telangana')}
                />
                
                {/* Andhra Pradesh */}
                <path
                  d="M 340 470 L 380 450 L 400 490 L 390 530 L 350 540 L 320 520 Z"
                  fill={selectedState === 'Andhra Pradesh' ? '#3b82f6' : getColor(9.2)}
                  stroke="#fff"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setSelectedState('Andhra Pradesh')}
                />
                
                {/* Tamil Nadu */}
                <path
                  d="M 270 580 L 320 570 L 350 600 L 340 650 L 300 660 L 260 640 Z"
                  fill={selectedState === 'Tamil Nadu' ? '#3b82f6' : getColor(11.3)}
                  stroke="#fff"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setSelectedState('Tamil Nadu')}
                />
                
                {/* Kerala */}
                <path
                  d="M 230 570 L 270 580 L 260 640 L 240 680 L 210 670 L 200 620 Z"
                  fill={selectedState === 'Kerala' ? '#3b82f6' : getColor(7.1)}
                  stroke="#fff"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setSelectedState('Kerala')}
                />
                
                {/* Assam */}
                <path
                  d="M 540 270 L 590 260 L 610 290 L 600 320 L 560 330 L 530 310 Z"
                  fill={selectedState === 'Assam' ? '#3b82f6' : getColor(31.9)}
                  stroke="#fff"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setSelectedState('Assam')}
                />
                
                {/* Meghalaya */}
                <path
                  d="M 560 330 L 590 325 L 600 345 L 585 360 L 555 355 Z"
                  fill={selectedState === 'Meghalaya' ? '#3b82f6' : getColor(11.9)}
                  stroke="#fff"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setSelectedState('Meghalaya')}
                />
                
                {/* Manipur */}
                <path
                  d="M 610 340 L 635 335 L 645 360 L 635 380 L 610 375 Z"
                  fill={selectedState === 'Manipur' ? '#3b82f6' : getColor(36.9)}
                  stroke="#fff"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setSelectedState('Manipur')}
                />
                
                {/* Mizoram */}
                <path
                  d="M 600 380 L 625 390 L 620 415 L 595 410 Z"
                  fill={selectedState === 'Mizoram' ? '#3b82f6' : getColor(20.4)}
                  stroke="#fff"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setSelectedState('Mizoram')}
                />
                
                {/* Tripura */}
                <path
                  d="M 555 355 L 580 360 L 575 385 L 550 380 Z"
                  fill={selectedState === 'Tripura' ? '#3b82f6' : getColor(14.1)}
                  stroke="#fff"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setSelectedState('Tripura')}
                />
                
                {/* Nagaland */}
                <path
                  d="M 610 290 L 640 280 L 650 310 L 640 330 L 615 325 Z"
                  fill={selectedState === 'Nagaland' ? '#3b82f6' : getColor(18.9)}
                  stroke="#fff"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setSelectedState('Nagaland')}
                />
                
                {/* Arunachal Pradesh */}
                <path
                  d="M 590 200 L 650 180 L 670 220 L 660 260 L 620 270 L 580 250 Z"
                  fill={selectedState === 'Arunachal Pradesh' ? '#3b82f6' : getColor(34.7)}
                  stroke="#fff"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setSelectedState('Arunachal Pradesh')}
                />
                
                {/* Sikkim */}
                <path
                  d="M 520 190 L 545 185 L 555 205 L 545 220 L 520 215 Z"
                  fill={selectedState === 'Sikkim' ? '#3b82f6' : getColor(8.2)}
                  stroke="#fff"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setSelectedState('Sikkim')}
                />

                {/* State Labels */}
                <text x="260" y="75" fontSize="10" fill="#1f2937" fontWeight="bold" textAnchor="middle">J&K</text>
                <text x="260" y="130" fontSize="10" fill="#1f2937" fontWeight="bold" textAnchor="middle">HP</text>
                <text x="230" y="155" fontSize="10" fill="#1f2937" fontWeight="bold" textAnchor="middle">PB</text>
                <text x="260" y="185" fontSize="9" fill="#1f2937" fontWeight="bold" textAnchor="middle">HR</text>
                <text x="305" y="165" fontSize="9" fill="#1f2937" fontWeight="bold" textAnchor="middle">UK</text>
                <text x="190" y="240" fontSize="11" fill="#1f2937" fontWeight="bold" textAnchor="middle">RJ</text>
                <text x="320" y="225" fontSize="11" fill="#1f2937" fontWeight="bold" textAnchor="middle">UP</text>
                <text x="160" y="340" fontSize="10" fill="#1f2937" fontWeight="bold" textAnchor="middle">GJ</text>
                <text x="300" y="310" fontSize="11" fill="#1f2937" fontWeight="bold" textAnchor="middle">MP</text>
                <text x="430" y="260" fontSize="10" fill="#1f2937" fontWeight="bold" textAnchor="middle">BR</text>
                <text x="450" y="320" fontSize="9" fill="#1f2937" fontWeight="bold" textAnchor="middle">JH</text>
                <text x="505" y="280" fontSize="9" fill="#1f2937" fontWeight="bold" textAnchor="middle">WB</text>
                <text x="470" y="385" fontSize="9" fill="#1f2937" fontWeight="bold" textAnchor="middle">OD</text>
                <text x="405" y="340" fontSize="9" fill="#1f2937" fontWeight="bold" textAnchor="middle">CG</text>
                <text x="265" y="430" fontSize="10" fill="#1f2937" fontWeight="bold" textAnchor="middle">MH</text>
                <text x="212" y="488" fontSize="8" fill="#1f2937" fontWeight="bold" textAnchor="middle">GA</text>
                <text x="250" y="530" fontSize="10" fill="#1f2937" fontWeight="bold" textAnchor="middle">KA</text>
                <text x="350" y="450" fontSize="9" fill="#1f2937" fontWeight="bold" textAnchor="middle">TG</text>
                <text x="360" y="500" fontSize="9" fill="#1f2937" fontWeight="bold" textAnchor="middle">AP</text>
                <text x="300" y="620" fontSize="10" fill="#1f2937" fontWeight="bold" textAnchor="middle">TN</text>
                <text x="220" y="630" fontSize="9" fill="#1f2937" fontWeight="bold" textAnchor="middle">KL</text>
                <text x="575" y="295" fontSize="9" fill="#1f2937" fontWeight="bold" textAnchor="middle">AS</text>
                <text x="620" y="235" fontSize="8" fill="#1f2937" fontWeight="bold" textAnchor="middle">AR</text>
                <text x="532" y="203" fontSize="7" fill="#1f2937" fontWeight="bold" textAnchor="middle">SK</text>
              </svg>
            </div>
          </div>

          {/* State Details Panel */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">State Details</h2>
            
            {selectedState ? (
              <div className="space-y-4">
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="text-xl font-bold text-gray-900">{selectedState}</h3>
                  <p className="text-sm text-gray-500">Click states on map to view details</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-600">Poverty Rate</span>
                    <span className="text-2xl font-bold" style={{ color: getColor(povertyData[selectedState].rate) }}>
                      {povertyData[selectedState].rate}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all"
                      style={{
                        width: `${povertyData[selectedState].rate}%`,
                        backgroundColor: getColor(povertyData[selectedState].rate)
                      }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-gray-700">Population</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {(povertyData[selectedState].population / 1000000).toFixed(1)}M
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center">
                      <TrendingDown className="w-5 h-5 text-red-600 mr-2" />
                      <span className="text-gray-700">People in Poverty</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {(povertyData[selectedState].poor / 1000000).toFixed(1)}M
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                      <span className="text-gray-700">Status</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {povertyData[selectedState].rate < 10 ? 'Very Low' :
                       povertyData[selectedState].rate < 15 ? 'Low' :
                       povertyData[selectedState].rate < 25 ? 'Medium' :
                       povertyData[selectedState].rate < 35 ? 'High' : 'Very High'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Hover over or click a state to view details</p>
              </div>
            )}
          </div>
        </div>

        {/* Data Table */}
        <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">All States Data</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">State</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Poverty Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Population</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">People in Poverty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(povertyData)
                  .sort(([, a], [, b]) => b.rate - a.rate)
                  .map(([state, data]) => (
                    <tr key={state} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">{state}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-bold" style={{ color: getColor(data.rate) }}>
                          {data.rate}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        {(data.population / 1000000).toFixed(1)}M
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        {(data.poor / 1000000).toFixed(1)}M
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          data.rate < 10 ? 'bg-green-100 text-green-800' :
                          data.rate < 15 ? 'bg-yellow-100 text-yellow-800' :
                          data.rate < 25 ? 'bg-orange-100 text-orange-800' :
                          data.rate < 35 ? 'bg-red-100 text-red-800' :
                          'bg-red-200 text-red-900'
                        }`}>
                          {data.rate < 10 ? 'Very Low' :
                           data.rate < 15 ? 'Low' :
                           data.rate < 25 ? 'Medium' :
                           data.rate < 35 ? 'High' : 'Very High'}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PovertyMap;
