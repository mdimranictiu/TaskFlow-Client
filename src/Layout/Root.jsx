import React from 'react';
import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <div>
            This is Root
            <Outlet></Outlet>
        </div>
    );
};

export default Root;