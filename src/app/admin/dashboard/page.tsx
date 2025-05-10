"use client";

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useAdmin } from '@/context/AdminContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

type UserRole = 'admin' | 'core_member' | 'team_member' | 'pending';

type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
  permissions: Record<string, boolean>;
};

// Home page sections that can have access control
const homePageSections = [
  { id: 'architecture', name: 'Architecture' },
  { id: 'app-ui', name: 'E-Socialize App UI' },
  { id: 'pitch-deck', name: 'Pitch Deck' },
  { id: 'business-strategy', name: 'Business Strategy' },
  { id: 'traction-analysis', name: 'Traction Analysis' },
  { id: 'roadmap', name: 'Roadmap' },
];

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { adminUser, signOut } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    // Check if admin is logged in
    if (!adminUser) {
      router.push('/admin');
      return;
    }

    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersData = querySnapshot.docs.map(doc => doc.data() as User);
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [adminUser, router]);

  const handleRoleChange = async (uid: string, newRole: UserRole) => {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, { role: newRole });
      
      // Update local state
      setUsers(users.map(u => 
        u.uid === uid ? { ...u, role: newRole } : u
      ));

      if (selectedUser?.uid === uid) {
        setSelectedUser({ ...selectedUser, role: newRole });
      }
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const handlePermissionChange = async (sectionId: string, checked: boolean) => {
    if (!selectedUser) return;

    try {
      const userRef = doc(db, 'users', selectedUser.uid);
      const updatedPermissions = { 
        ...selectedUser.permissions, 
        [sectionId]: checked 
      };
      
      await updateDoc(userRef, { permissions: updatedPermissions });
      
      // Update local state
      setSelectedUser({
        ...selectedUser,
        permissions: updatedPermissions
      });

      setUsers(users.map(u => 
        u.uid === selectedUser.uid 
          ? { ...u, permissions: updatedPermissions } 
          : u
      ));
    } catch (error) {
      console.error('Error updating user permissions:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] py-4 sm:py-6">
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4 sm:mb-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
              Admin Dashboard
            </h1>
            <button 
              onClick={signOut}
              className="bg-white/10 text-white/90 hover:bg-white/20 hover:text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors"
            >
              Sign Out
            </button>
          </div>
          <p className="text-xs sm:text-sm text-white/80 max-w-3xl mx-auto">
            Manage user roles and permissions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Users List */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
              <h2 className="text-sm font-semibold text-white mb-4">Users</h2>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
                  <p className="text-white/60 text-sm">Loading users...</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {users.map(user => (
                    <div
                      key={user.uid}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        selectedUser?.uid === user.uid 
                          ? 'bg-white/20 border border-white/30' 
                          : 'bg-white/5 hover:bg-white/10 border border-white/10'
                      }`}
                      onClick={() => setSelectedUser(user)}
                    >
                      <div className="flex items-center gap-3">
                        {user.photoURL && (
                          <img 
                            src={user.photoURL} 
                            alt={user.displayName || 'User'} 
                            className="w-8 h-8 rounded-full"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{user.displayName}</p>
                          <p className="text-xs text-white/60 truncate">{user.email}</p>
                        </div>
                        <div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            user.role === 'admin' ? 'bg-purple-500/30 text-purple-300' :
                            user.role === 'core_member' ? 'bg-blue-500/30 text-blue-300' :
                            user.role === 'team_member' ? 'bg-green-500/30 text-green-300' :
                            'bg-yellow-500/30 text-yellow-300'
                          }`}>
                            {user.role === 'admin' ? 'Admin' :
                             user.role === 'core_member' ? 'Core Member' :
                             user.role === 'team_member' ? 'Team Member' :
                             'Pending'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* User Details & Permissions */}
          <div className="lg:col-span-2">
            {selectedUser ? (
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-4 mb-6">
                  {selectedUser.photoURL && (
                    <img 
                      src={selectedUser.photoURL} 
                      alt={selectedUser.displayName || 'User'} 
                      className="w-16 h-16 rounded-full border-2 border-white/20"
                    />
                  )}
                  <div>
                    <h2 className="text-lg font-semibold text-white">{selectedUser.displayName}</h2>
                    <p className="text-sm text-white/60">{selectedUser.email}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-white mb-2">Role</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      className={`px-3 py-1.5 rounded-lg text-sm ${
                        selectedUser.role === 'admin' 
                          ? 'bg-purple-500 text-white' 
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                      onClick={() => handleRoleChange(selectedUser.uid, 'admin')}
                    >
                      Admin
                    </button>
                    <button
                      className={`px-3 py-1.5 rounded-lg text-sm ${
                        selectedUser.role === 'core_member' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                      onClick={() => handleRoleChange(selectedUser.uid, 'core_member')}
                    >
                      Core Member
                    </button>
                    <button
                      className={`px-3 py-1.5 rounded-lg text-sm ${
                        selectedUser.role === 'team_member' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                      onClick={() => handleRoleChange(selectedUser.uid, 'team_member')}
                    >
                      Team Member
                    </button>
                  </div>
                </div>

                {selectedUser.role === 'team_member' && (
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-2">Page Permissions</h3>
                    <p className="text-xs text-white/60 mb-3">Select which pages this team member can access:</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {homePageSections.map(section => (
                        <div 
                          key={section.id}
                          className="flex items-center p-2 bg-white/5 rounded-lg"
                        >
                          <input
                            type="checkbox"
                            id={`permission-${section.id}`}
                            checked={!!selectedUser.permissions?.[section.id]}
                            onChange={(e) => handlePermissionChange(section.id, e.target.checked)}
                            className="w-4 h-4 rounded border-white/30 bg-white/10 focus:ring-2 focus:ring-white/30"
                          />
                          <label
                            htmlFor={`permission-${section.id}`}
                            className="ml-2 text-sm text-white cursor-pointer flex-1"
                          >
                            {section.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white/30 text-2xl">👥</span>
                  </div>
                  <p className="text-white/60">Select a user to manage their roles and permissions</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 