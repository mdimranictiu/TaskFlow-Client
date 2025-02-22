import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
    const error = useRouteError();
    document.title = "Error Page";

    return (
        <div className='flex flex-col h-screen items-center justify-center bg-gray-100 px-6 text-center'>
            <div className='bg-white p-8 rounded-2xl shadow-lg max-w-md'>
                <FaExclamationTriangle className='text-red-500 w-16 h-16 mx-auto' />
                <h1 className='text-3xl font-bold text-gray-800 mt-4'>Oops! Something went wrong.</h1>
                <p className='text-gray-600 mt-2'>
                    {error?.statusText || error?.message || "An unexpected error has occurred."}
                </p>
                <Link to='/dashboard' className='mt-6 inline-block bg-black text-white px-5 py-2 rounded-lg shadow-md  transition'>
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
