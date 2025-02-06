import { useState } from 'react';
import { User, Mail, Phone, MapPin, Building, Calendar } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: sessionStorage.getItem('username') || 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    address: '123 Project Street, Tech City',
    department: 'Project Management',
    joinDate: '2023-01-15',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update logic here
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Profile Settings</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-32 h-32 mb-4 bg-blue-100 rounded-full">
              <User className="w-16 h-16 text-blue-600" />
            </div>
            <h2 className="text-xl font-medium text-gray-900">{profileData.name}</h2>
            <p className="text-gray-500">Project Manager</p>
          </div>
        </div>

        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    disabled={!isEditing}
                    className="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditing}
                    className="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    disabled={!isEditing}
                    className="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                  <input
                    type="text"
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    disabled={!isEditing}
                    className="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Department
                </label>
                <div className="relative">
                  <Building className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                  <input
                    type="text"
                    value={profileData.department}
                    onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                    disabled={!isEditing}
                    className="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Join Date
                </label>
                <div className="relative">
                  <Calendar className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                  <input
                    type="date"
                    value={profileData.joinDate}
                    onChange={(e) => setProfileData({ ...profileData, joinDate: e.target.value })}
                    disabled={!isEditing}
                    className="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;