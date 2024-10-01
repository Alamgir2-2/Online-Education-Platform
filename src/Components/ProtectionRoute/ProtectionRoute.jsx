// src/Components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../Layout/Header/UserContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useUser();

    // Check if the user is logged in and has an allowed role
    const isAllowed = user && allowedRoles.includes(user.role);

    if (!user) {
        // If user is not logged in, redirect to login page
        return <Navigate to="/login" replace />;
    }

    if (!isAllowed) {
        // If user is logged in but does not have the right role, you can redirect to another page
        return <Navigate to="/" replace />; // Redirect to home or an unauthorized page
    }

    return children; // If allowed, render the protected component
};

export default ProtectedRoute;
