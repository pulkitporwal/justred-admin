import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute() {
	const currentUser = useSelector((state) => state.user?.currentUser);


	if (!currentUser) {
		return <Navigate to="/signin" />;
	}

	if (!currentUser.isAdmin) {
		return <Navigate to="/unauthorized" />;
	}

	return <Outlet />;
}
