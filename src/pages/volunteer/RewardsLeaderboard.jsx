import React from 'react';
import { Trophy, Award, Star, TrendingUp } from 'lucide-react';

const RewardsLeaderboard = () => {
  const leaderboard = [
    { rank: 1, name: 'Priya Sharma', district: 'Mumbai', verifications: 45, accuracy: 98, points: 4410 },
    { rank: 2, name: 'Rahul Kumar', district: 'Delhi', verifications: 42, accuracy: 95, points: 3990 },
    { rank: 3, name: 'Anjali Patel', district: 'Bangalore', verifications: 38, accuracy: 97, points: 3686 },
    { rank: 4, name: 'Amit Singh', district: 'Mumbai', verifications: 35, accuracy: 96, points: 3360 },
    { rank: 5, name: 'Sneha Reddy', district: 'Hyderabad', verifications: 32, accuracy: 94, points: 3008 },
  ];

  const badges = [
    { name: 'Bronze', minPoints: 0, color: 'bg-orange-100 text-orange-800' },
    { name: 'Silver', minPoints: 1000, color: 'bg-gray-100 text-gray-800' },
    { name: 'Gold', minPoints: 3000, color: 'bg-yellow-100 text-yellow-800' },
    { name: 'Platinum', minPoints: 5000, color: 'bg-purple-100 text-purple-800' },
  ];

  const yourStats = {
    rank: 2,
    points: 3990,
    verifications: 42,
    accuracy: 95,
    badge: 'Gold'
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Rewards & Leaderboard</h1>
        <p className="text-gray-600">Track your progress and compete with other volunteers</p>
      </div>

      {/* Your Stats */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 mb-6 text-white">
        <h2 className="text-xl font-bold mb-4">Your Performance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <Trophy className="w-8 h-8 mb-2" />
            <p className="text-sm opacity-90">Rank</p>
            <p className="text-2xl font-bold">#{yourStats.rank}</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <Star className="w-8 h-8 mb-2" />
            <p className="text-sm opacity-90">Points</p>
            <p className="text-2xl font-bold">{yourStats.points}</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <TrendingUp className="w-8 h-8 mb-2" />
            <p className="text-sm opacity-90">Verifications</p>
            <p className="text-2xl font-bold">{yourStats.verifications}</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <Award className="w-8 h-8 mb-2" />
            <p className="text-sm opacity-90">Badge</p>
            <p className="text-2xl font-bold">{yourStats.badge}</p>
          </div>
        </div>
      </div>

      {/* Badge Levels */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Badge Levels</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div key={badge.name} className="text-center">
              <div className={`${badge.color} rounded-lg p-4 mb-2`}>
                <Award className="w-12 h-12 mx-auto" />
              </div>
              <p className="font-bold text-gray-900">{badge.name}</p>
              <p className="text-sm text-gray-600">{badge.minPoints}+ points</p>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Top Volunteers</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">Rank</th>
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">District</th>
                <th className="text-left py-3 px-4">Verifications</th>
                <th className="text-left py-3 px-4">Accuracy</th>
                <th className="text-left py-3 px-4">Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((volunteer) => (
                <tr 
                  key={volunteer.rank} 
                  className={`border-b border-gray-100 hover:bg-gray-50 ${
                    volunteer.rank === yourStats.rank ? 'bg-blue-50' : ''
                  }`}
                >
                  <td className="py-4 px-4">
                    {volunteer.rank <= 3 ? (
                      <div className="flex items-center gap-2">
                        <Trophy className={`w-5 h-5 ${
                          volunteer.rank === 1 ? 'text-yellow-500' :
                          volunteer.rank === 2 ? 'text-gray-400' :
                          'text-orange-600'
                        }`} />
                        <span className="font-bold">#{volunteer.rank}</span>
                      </div>
                    ) : (
                      <span className="font-medium text-gray-600">#{volunteer.rank}</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-gray-900">{volunteer.name}</span>
                    {volunteer.rank === yourStats.rank && (
                      <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">You</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-gray-600">{volunteer.district}</td>
                  <td className="py-4 px-4 text-gray-600">{volunteer.verifications}</td>
                  <td className="py-4 px-4">
                    <span className={`font-semibold ${
                      volunteer.accuracy >= 95 ? 'text-green-600' :
                      volunteer.accuracy >= 90 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {volunteer.accuracy}%
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-bold text-blue-600">{volunteer.points}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Points Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <h3 className="font-bold text-blue-900 mb-2">How Points Work</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Complete verification: 100 points</li>
          <li>• High accuracy bonus: +10 points (95%+ accuracy)</li>
          <li>• Quick completion: +5 points (completed before deadline)</li>
          <li>• Photo documentation: +5 points</li>
        </ul>
      </div>
    </div>
  );
};

export default RewardsLeaderboard;
