import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../contexts/authcontexts";
import logo from "../../../resources/savor_logo_text.png";
const LoginPage: React.FC = () => {
	const { loginWithGoogle } = useAuth();


    const textStyle = "text-[#6CC51D] "
	return (
		<div className="flex flex-col justify-center items-center bg-[#F6F6F9] min-w-screen min-h-screen">
            <img src={logo} alt="Logo"/> 
			<h2 className={textStyle}>Dive into a sustainable lifestyle with Savor</h2>
            <hr className="border-t border-[#6CC51D] w-8 my-2" />
            <h2 className={textStyle}>Save, Savor, Simplify!</h2>
            <SignInButton/>
		</div>
	);
};
const SignInButton: React.FC = () =>{
	const handleLogin = async () => {
		try {
			await loginWithGoogle();
			// Optionally, redirect the user or perform some action after successful login
			console.log("User signed in successfully");
		} catch (error) {
			console.error("Failed to sign in with Google", error);
		}
	};
    
    return(

        <div className="flex flex-row py-3 m-10 px-5 bg-white border-2 border-gray-300 rounded-lg" onClick={handleLogin}>
            <FcGoogle size="24"/>
            <h1 className="pl-5">Sign in with Google</h1>
        </div>
      

    );
}
export default LoginPage;
