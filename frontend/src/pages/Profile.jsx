import React, { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '../services/api';
import { User, Mail, Calendar, Shield, Edit2, Save, X } from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  // Load User Data
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    getUserProfile()
      .then(data => {
        setUser(data);
        setFormData({ name: data.name, email: data.email, password: '' }); // Reset form
      })
      .catch(err => console.error("Failed to load profile", err));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUserProfile(formData);
      setUser(updatedUser);
      setIsEditing(false);
      alert("Profile Updated Successfully!");
    } catch (err) {
      alert("Update failed: " + err.response?.data?.message);
    }
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;

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
          
          {/* Edit Button (Top Right) */}
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full text-white transition"
            title={isEditing ? "Cancel" : "Edit Profile"}
          >
            {isEditing ? <X size={20} /> : <Edit2 size={20} />}
          </button>
        </div>

        {/* Content Area */}
        <div className="pt-12 pb-8 px-8">
          
          {isEditing ? (
            // --- EDIT MODE ---
            <form onSubmit={handleSave} className="space-y-4 text-left">
              <h2 className="text-xl font-bold text-center mb-4">Edit Profile</h2>
              
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                <input 
                  type="text" value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full p-2 border rounded mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                <input 
                  type="email" value={formData.email} 
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full p-2 border rounded mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">New Password (Optional)</label>
                <input 
                  type="password" placeholder="Leave blank to keep current"
                  onChange={e => setFormData({...formData, password: e.target.value})}
                  className="w-full p-2 border rounded mt-1"
                />
              </div>

              <button className="w-full bg-green-600 text-white p-2 rounded flex items-center justify-center gap-2 hover:bg-green-700">
                <Save size={18} /> Save Changes
              </button>
            </form>
          ) : (
            // --- VIEW MODE ---
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>

              <div className="space-y-4 text-left">
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <Mail className="text-blue-500" size={20} />
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold">Email</p>
                    <p className="text-gray-700 font-medium">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="text-orange-500" size={20} />
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold">Joined On</p>
                    <p className="text-gray-700 font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <Shield className="text-green-500" size={20} />
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold">Account ID</p>
                    <p className="text-gray-700 font-medium text-xs font-mono truncate w-40">{user._id}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;