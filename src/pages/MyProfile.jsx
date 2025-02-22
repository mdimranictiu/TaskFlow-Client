import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthProvider';
import UseAxiosSecure from '../hooks/UseAxiosSecure';

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosSecure = UseAxiosSecure();
  document.title="My Profile"
    // Fetch user data
    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/user/email?email=${user.email}`)
                .then((res) => {
                    setUserData(res.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error.message);
                    setLoading(false);
                });
        }
    }, [user?.email, axiosSecure]);
console.log(userData)
    // Extract part of UUID
    const extractPartOfUUID = (uid) => {
        return uid ? uid.split('-')[2] : "N/A";
    };

    return (
        <div className="flex justify-center my-10 min-h-96">
            <div className="shadow-2xl bg-white rounded-lg w-full max-w-5xl p-10">
                {/* Profile Section */}
                <div className="text-center pb-8">
                    <img
                        src={user?.photoURL || "/default-avatar.png"} 
                        alt="User Profile"
                        className="w-32 h-32 rounded-full mx-auto mb-4"
                    />
                    <h2 className="text-3xl font-bold">{user?.displayName || "User"}</h2>
                    <p className="text-gray-500 text-xl">
                        <strong>User ID:</strong> {loading ? "Loading..." : extractPartOfUUID(userData?.userID)}
                    </p>
                    <p className="text-gray-500 text-xl"><strong>Email:</strong> {user?.email}</p>
                    <p className="text-gray-400 mt-2">
                        <strong>Joined:</strong> {loading ? "Loading..." : new Date(userData?.createdAt).toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
