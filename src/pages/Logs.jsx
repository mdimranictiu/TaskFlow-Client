import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthProvider';
import UseAxiosSecure from '../hooks/UseAxiosSecure';

const Logs = () => {
    const {user}=useContext(AuthContext)
    const [logs,setLogs]=useState([])
    const [loading,setLoading]=useState(true)
    const axiosSecure=UseAxiosSecure();
    document.title="Activity"
    useEffect(()=>{
        axiosSecure.get('/logs')
        .then((res)=>{
            setLogs(res.data)
            setLoading(false)
        })
        .catch((error)=>{
            console.log('Error to fetch logs',error.message)
            setLoading(false)
        })
    },[axiosSecure])
    console.log(logs)
    return (
        <div className="w-full mx-auto min-h-screen shadow-2xl rounded-lg p-10 bg-white">
        <h2 className="text-center text-3xl max-sm:text-2xl font-bold  mb-8">Monitor Your Activity</h2>
  
        <div className="py-5">
          {logs.length > 0 ? (
            <ul className="space-y-5">
              {logs.map((log, index) => (
                <li
                  key={index}
                  className="flex max-sm:flex-col  text-[#8080A1] px-3 py-3 gap-3 rounded-lg shadow-xl"
                >
                  <p>
                    <strong>Task ID:</strong> {log.taskId}
                  </p>
                  <p>
                    <strong>Details:</strong> {log.details}
                  </p>
                  <p>
                    <strong>At</strong> {new Date(log.timestamp).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-lg font-semibold text-gray-600">No logs found.</p>
          )}
        </div>
      </div>
    );
};

export default Logs;