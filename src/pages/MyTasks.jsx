import React, { useContext, useEffect, useState } from 'react';
import { FaTasks } from "react-icons/fa";

import { FaCheckCircle } from "react-icons/fa";
import { MdPending } from "react-icons/md";
import { RiProgress3Line } from "react-icons/ri";

import UseAxiosSecure from '../hooks/UseAxiosSecure';
import { AuthContext } from '../AuthContext/AuthProvider';

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [todo, setTodo] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(0);
  const axiosSecure = UseAxiosSecure();
  
  const { user } = useContext(AuthContext);
  console.log('auth ', user);
  document.title = `${user?.displayName} Tasks`;
  const email=user?.email
  const [loading,setLoading]=useState(true)
  useEffect(() => {
    setLoading(true)
    axiosSecure.get(`/tasks?email=${email}`)
      .then((res) => {
        setTasks(res.data);
        setLoading(false)
        
        // Count tasks based on their status
        const todoTasks = res?.data?.filter(task => task.category === 'To-Do');
        const progressTasks = res?.data?.filter(task => task.category === 'In Progress');
        const doneTasks = res?.data?.filter(task => task.category === 'Done');
        
        setTodo(todoTasks.length);
        setProgress(progressTasks.length);
        setDone(doneTasks.length);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error.message);
        setLoading(false)
      });
  }, [axiosSecure]);

  return (
    <div className='w-full mx-auto min-h-screen shadow-2xl rounded-lg p-10'>
        <h2 className='text-center text-3xl max-sm:text-2xl font-bold'>Monitor Your Tasks: From To-Do to Done</h2>
        <div className='my-10'>
          <div className='grid text-center grid-cols-3 px-10 py-10 max-sm:px-2 max-sm:py-5 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1'>
            {/* My Tasks */}
            <div className='h-[220px] flex flex-col gap-5 items-center justify-center rounded-xl bg-[#0D9488]'>
              <FaTasks className='text-4xl' />
              <h2 className='text-2xl font-bold'>My Tasks</h2>
              <span className='text-2xl font-bold'>{loading? "loading...": tasks?.length}</span>
            </div>
            
            {/* To Do Tasks */}
            <div className='h-[220px] flex flex-col gap-5 items-center justify-center rounded-xl bg-[#3B82F6]'>
              <MdPending className='text-4xl' />
              <h2 className='text-2xl font-bold'>To Do</h2>
              <span className='text-2xl font-bold'>{loading? "loading...": todo}</span>
            </div>
            
            {/* In Progress Tasks */}
            <div className='h-[220px] flex flex-col gap-5 items-center justify-center rounded-xl bg-[#FB923C]'>
              <RiProgress3Line className='text-4xl' />
              <h2 className='text-2xl font-bold'>In Progress</h2>
              <span className='text-2xl font-bold'>{loading ? "loading..." :progress}</span>
            </div>

            {/* Done Tasks */}
            <div className='h-[220px] flex flex-col gap-5 items-center justify-center rounded-xl bg-green-500'>
              <FaCheckCircle className='text-4xl' />
              <h2 className='text-2xl font-bold'>Done</h2>
              <span className='text-2xl font-bold'>{loading? 'loading...': done}</span>
            </div>
          </div>
        </div>
      </div>
  );
};

export default MyTasks;
