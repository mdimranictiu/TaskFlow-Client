import React, { useContext, useEffect, useState } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { AuthContext } from '../AuthContext/AuthProvider';
import UseAxiosSecure from '../hooks/UseAxiosSecure';
import { IoMdClose } from "react-icons/io";
import { CgDetailsMore } from "react-icons/cg";

const Home = () => {
    const { user } = useContext(AuthContext);
    const email = user?.email;
    const axiosSecure = UseAxiosSecure();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [task, setTask] = useState({});
    const [fetch, setRefetch] = useState(false);
    const [editedTask, setEditedTask] = useState({
        title: '',
        description: '',
        dueDate: '',
    });

    useEffect(() => {
        setLoading(true);
        axiosSecure.get(`/tasks?email=${email}`)
            .then((res) => {
                setTasks(res?.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log('error', error.message);
                setLoading(false);
            });
    }, [axiosSecure]);

    const todoTasks = tasks.filter(task => task.category === "To-Do");
    const inProgressTasks = tasks.filter(task => task.category === "In Progress");
    const doneTasks = tasks.filter(task => task.category === "Done");
    console.log(tasks);

    // Handle details show
    const handleDetailsShow = (id) => {
        document.getElementById('my_modal_5').showModal();
        setLoading(true);
        axiosSecure.get(`/task/${id}`)
            .then((res) => {
                setTask(res?.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log('Error', error.message);
                setLoading(false);
            });
    };

    const handleDelete = (id) => {
        axiosSecure.delete(`/task/${id}`)
            .then((res) => {
                setTasks(tasks.filter(task => task._id !== id));
            })
            .catch((error) => {
                console.log('error', error.message);
            });
    };

    console.log(task);

    // Handle Edit
    const handleEdit = (id) => {
        // Find the task that needs to be edited
        const taskToEdit = tasks.find(task => task._id === id);
        if (taskToEdit) {
            setEditedTask(taskToEdit);  // Set the task data in the state so it can be used to populate the form
            document.getElementById('edit_modal').showModal();  // Open the edit modal
        }
    };

    const handleUpdate = () => {
        axiosSecure.patch(`/task/${editedTask._id}`, editedTask)
            .then((res) => {
                // Update the tasks state with the updated task data
                setTasks(prevTasks => prevTasks.map(task => task._id === editedTask._id ? editedTask : task));
                document.getElementById('edit_modal').close();  // Close the modal
            })
            .catch((error) => {
                console.log('Error updating task:', error.message);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTask({
            ...editedTask,
            [name]: value,
        });
    };

    return (
        <div className='w-full mx-auto min-h-screen shadow-2xl rounded-lg p-10'>
            <div className='grid grid-cols-3 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1'>
                <div className="bg-[#426DC6] min-h-96 p-6 rounded-lg shadow-lg">
                    <h3 className="text-center font-bold text-xl text-white uppercase tracking-wide">To Do</h3>
                    <div className="border-t-2 border-white/50 my-3"></div>
                    <ul className="space-y-4">
                        {todoTasks.length === 0 ? (
                            <p className="text-white text-center">No tasks available</p>
                        ) : (
                            todoTasks.map((task, index) => (
                                <li key={index} className="hover:bg-white px-5 py-4 text-lg text-white rounded-lg shadow-lg hover:text-black cursor-pointer bg-[black] transition duration-500">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-semibold">{task.title}</h4>
                                        <div className="flex gap-4">
                                            <CgDetailsMore onClick={() => handleDetailsShow(task?._id)} className="text-xl cursor-pointer hover:text-black transition" />
                                            <FaRegEdit onClick={() => handleEdit(task?._id)} className="text-xl cursor-pointer hover:text-black transition" />
                                            <MdOutlineDelete onClick={() => handleDelete(task?._id)} className="text-xl cursor-pointer hover:text-black transition" />
                                        </div>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>

                <div className="bg-[#426DC6] min-h-96 p-6 rounded-lg shadow-lg">
                    <h3 className="text-center font-bold text-xl text-white uppercase tracking-wide">In Progress</h3>
                    <div className="border-t-2 border-white/50 my-3"></div>
                    <ul className="space-y-4">
                        {inProgressTasks.length === 0 ? (
                            <p className="text-white text-center">No tasks available</p>
                        ) : (
                            inProgressTasks.map((task, index) => (
                                <li key={index} className="hover:bg-white px-5 py-4 text-lg text-white rounded-lg shadow-lg hover:text-black cursor-pointer bg-[black] transition duration-500">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-semibold">{task.title}</h4>
                                        <div className="flex gap-4">
                                            <CgDetailsMore onClick={() => handleDetailsShow(task?._id)} className="text-xl cursor-pointer hover:text-black transition" />
                                            <FaRegEdit onClick={() => handleEdit(task?._id)} className="text-xl cursor-pointer hover:text-black transition" />
                                            <MdOutlineDelete onClick={() => handleDelete(task?._id)} className="text-xl cursor-pointer hover:text-black transition" />
                                        </div>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>

                <div className="bg-[#426DC6] min-h-96 p-6 rounded-lg shadow-lg">
                    <h3 className="text-center font-bold text-xl text-white uppercase tracking-wide">Done</h3>
                    <div className="border-t-2 border-white/50 my-3"></div>
                    <ul className="space-y-4">
                        {doneTasks.length === 0 ? (
                            <p className="text-white text-center">No tasks available</p>
                        ) : (
                            doneTasks.map((task, index) => (
                                <li key={index} className="hover:bg-white px-5 py-4 text-lg text-white rounded-lg shadow-lg hover:text-black cursor-pointer bg-[black] transition duration-500">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-semibold">{task.title}</h4>
                                        <div className="flex gap-4">
                                            <CgDetailsMore onClick={() => handleDetailsShow(task?._id)} className="text-xl cursor-pointer hover:text-black transition" />
                                            <FaRegEdit onClick={() => handleEdit(task?._id)} className="text-xl cursor-pointer hover:text-black transition" />
                                            <MdOutlineDelete onClick={() => handleDelete(task?._id)} className="text-xl cursor-pointer hover:text-black transition" />
                                        </div>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>

            {/* Details Modal */}
            <dialog id="my_modal_5" className="modal modal-center">
                <div className="modal-box w-11/12 max-w-3xl">
                    <form method="dialog">
                        <button className="text-2xl btn-ghost absolute cursor-pointer right-5 top-5"><IoMdClose /></button>
                    </form>
                    {loading ?
                        <p className='text-center'>Details are loading...</p> :
                        <div className='flex flex-col items-center gap-2'>
                            <h3 className="font-bold text-center text-lg">{task?.title}</h3>
                            <p className='font-bold '>Description: </p>
                            <p className='text-gray-500'> {task?.description}</p>
                            <p className='font-bold text-red-500'>Due Time: {task?.dueDate} </p>
                        </div>
                    }
                </div>
            </dialog>

            {/* Edit Modal */}
            <dialog id="edit_modal" className="modal modal-center">
                <div className="modal-box w-11/12 max-w-2xl">
                    <form method="dialog">
                        <button className="text-2xl btn-ghost absolute cursor-pointer right-5 top-5">
                            <IoMdClose />
                        </button>
                    </form>

                    <div>
                        <h2 className="font-bold text-xl text-center text-black">Edit Task</h2>

                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700">Task Title</label>
                            <input
                                type="text"
                                name="title"
                                value={editedTask.title}
                                onChange={handleChange}
                                className="input w-full"
                                placeholder="Task Title"
                            />
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                name="description"
                                value={editedTask.description}
                                onChange={handleChange}
                                className="textarea w-full"
                                placeholder="Task Description"
                            />
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700">Due Date</label>
                            <input
                                type="date"
                                name="dueDate"
                                value={editedTask.dueDate}
                                onChange={handleChange}
                                className="input w-full"
                            />
                        </div>

                        <div className="mt-8">
                            <button onClick={handleUpdate} className="btn bg-blue-500 text-white">Update Task</button>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Home;
