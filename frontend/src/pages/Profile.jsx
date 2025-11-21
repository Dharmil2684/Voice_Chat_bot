import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../services/api';
import { User, Mail, Calendar, Shield } from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserProfile()
      .then(data => setUser(data))
      .catch(err => console.error("Failed to load profile", err));
  }, []);

  if (!user) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header Banner */}
        <div className="bg-blue-600 h-32 relative">
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
            <div className="w-24 h-24 bg-white rounded-full p-1 shadow-lg flex items-center justify-center">
              <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                <User size={48} />
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-12 pb-8 px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-gray-500 text-sm mb-6">Voice Bot Member</p>

          <div className="space-y-4 text-left">
            
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <Mail className="text-blue-500" size={20} />
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold">Email Address</p>
                <p className="text-gray-700 font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <Calendar className="text-orange-500" size={20} />
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold">Joined On</p>
                <p className="text-gray-700 font-medium">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;