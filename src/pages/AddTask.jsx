import React from 'react';
import { useForm } from 'react-hook-form';
import UseAxiosSecure from '../hooks/UseAxiosSecure';
import Swal from 'sweetalert2';

const AddTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const axiosSecure=UseAxiosSecure()

  const onSubmit = (data) => {
    const { title, description, category, dueDate } = data;
    
    const taskData = { title, description, category, dueDate};

    console.log("Task Data:", taskData);
     axiosSecure.post('/add-task',taskData)
     .then((res)=>{
        if(res.data.insertedId){
            Swal.fire({
                          position: "center",
                          icon: "success",
                          title: `Done`,
                          text: "Task Added Successfully",
                          showConfirmButton: false,
                          timer: 1500,
                        });
        reset();
        }
     })
     .catch((error)=>{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error.message}`,
          });
     })
    reset();
  };

  return (
    <div className="flex justify-center min-h-8/12 bg-gray-100">
      <div className="shadow-2xl bg-white rounded-lg w-full max-w-5xl p-10">
        <h2 className="text-center py-5 text-3xl font-bold">Add A Task</h2>
        <div className="max-w-lg mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Title Input */}
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-1">
                Title
              </label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0C65E3] focus:outline-none"
                placeholder="Title of Your Task"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            {/* Description Input */}
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-1">
                Description (Optional)
              </label>
              <textarea
                {...register("description")}
                className="w-full px-4 py-2 border h-32 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0C65E3] focus:outline-none"
                placeholder="Describe your task"
              />
            </div>

            {/* Category Dropdown */}
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-1">
                Category
              </label>
              <select
                {...register("category", { required: "Category is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0C65E3] focus:outline-none"
              >
                <option value="To-Do">To-Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category.message}</p>
              )}
            </div>

            {/* Due Date Input */}
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-1">
                Due Date
              </label>
              <input
                type="date"
                {...register("dueDate", { required: "Due date is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0C65E3] focus:outline-none"
              />
              {errors.dueDate && (
                <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center mt-10">
              <button
                type="submit"
                className="w-full px-4 cursor-pointer py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
