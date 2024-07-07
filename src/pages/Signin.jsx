import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AXIOS_API } from "@/utils/axios";
import { startLoading, stopLoading } from "@/redux/statusSlice";
import Loader from "@/components/Loader";
import { setUser } from "@/redux/userSlice";

const Signin = () => {
	const status = useSelector((state) => state.status);
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();


	useEffect(() => {
		if (user.currentUser) {
			console.log(user.currentUser);
			navigate("/dashboard");
		}
	}, [user, navigate]);

	const [formData, setFormData] = useState({
		usernameOrEmail: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	const handlePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(startLoading());

		try {
			const response = await AXIOS_API.post(`/auth/signin`, formData);

			console.log("Response:", response);

			if (response) {
				dispatch(stopLoading());
				navigate("/dashboard");
			}
			dispatch(setUser(response?.data?.userInfo));	
			navigate("/dashboard");
		} catch (error) {
			dispatch(stopLoading());
			if (error.response) {
				console.error("Server responded with an error:", error.response.data);
				setError(error.response.data.message);
			} else if (error.request) {
				console.error("No response received:", error.request);
				setError("No response received from the server.");
			} else {
				console.error("Error in setting up the request:", error.message);
				setError("Error in setting up the request.");
			}
		}
	};

	return (
		<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
			{status.loading && <Loader />}
			<div className="mx-auto max-w-lg">
				<h1 className="text-center text-2xl font-bold text-[#f50505] sm:text-3xl">
					Get started today
				</h1>

				<form
					onSubmit={handleSubmit}
					className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
				>
					<p className="text-center text-lg font-medium">Sign in to your account</p>

					<div>
						<label htmlFor="usernameOrEmail" className="sr-only">
							Username or Email
						</label>

						<input
							id="usernameOrEmail"
							type="text"
							className="w-full rounded-lg border-gray-200 p-4 text-black text-sm shadow-sm"
							onChange={handleChange}
							value={formData.usernameOrEmail}
							placeholder="Enter username or email"
						/>
					</div>

					<div>
						<label htmlFor="password" className="sr-only">
							Password
						</label>

						<div className="relative">
							<input
								id="password"
								type={showPassword ? "text" : "password"}
								className="w-full rounded-lg border-gray-200 p-4 text-black text-sm shadow-sm"
								placeholder="Enter password"
								value={formData.password}
								onChange={handleChange}
							/>

							<span
								className="absolute cursor-pointer inset-y-0 end-0 grid place-content-center px-4"
								onClick={handlePasswordVisibility}
							>
								{showPassword ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 text-gray-400"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
										/>
									</svg>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 text-gray-400"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
										/>
									</svg>
								)}
							</span>
						</div>
					</div>

					<button
						type="submit"
						className="block w-full rounded-lg bg-[#f50505] px-5 py-3 text-sm font-medium text-white"
					>
						Sign in
					</button>

					<p className="text-center text-sm text-gray-500">
						No account?
						<a className="underline" href="#">
							Sign up
						</a>
					</p>
				</form>
			</div>
		</div>
	);
};

export default Signin;
