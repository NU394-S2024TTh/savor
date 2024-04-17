import React from "react";
import { FcGoogle } from "react-icons/fc";

import logo from "../../../resources/savor_logo_text.png";
import { useAuth } from "../../contexts/authcontexts";
const LoginPage: React.FC = () => {
	const textStyle = "text-[#6CC51D] ";
	return (
		<div className="min-w-screen flex min-h-screen flex-col items-center justify-center bg-[#F6F6F9]">
			<img src={logo} alt="Logo" />
			<h2 className={textStyle}>Dive into a sustainable lifestyle with Savor</h2>
			<hr className="my-2 w-8 border-t border-[#6CC51D]" />
			<h2 className={textStyle}>Save, Savor, Simplify!</h2>
			<SignInButton />
		</div>
	);
};
const SignInButton: React.FC = () => {
	const { loginWithGoogle } = useAuth();
	const handleLogin = async () => {
		try {
			await loginWithGoogle();
			// Optionally, redirect the user or perform some action after successful login
			console.log("User signed in successfully");
		} catch (error) {
			console.error("Failed to sign in with Google", error);
		}
	};

	return (
		<div
			className="m-10 flex flex-row rounded-lg border-2 border-gray-300 bg-white px-5 py-3"
			onClick={handleLogin}
		>
			<FcGoogle size="24" />
			<h1 className="pl-5">Sign in with Google</h1>
		</div>
	);
};
export default LoginPage;
