import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { AuthProvider, useAuth } from "./contexts/authcontexts";
import Homepage from "./pages/homepage/homepage";
import LoginPage from "./pages/profilepage/loginpage";
// AppRouter component to decide which page to render based on auth status
const AppRouter = () => {
	const { currentUser } = useAuth(); // Assuming useAuth returns an object with currentUser

	// Check if there's a user logged in and return the corresponding component
	if (currentUser && currentUser.displayName) {
		return <Homepage />;
	} else {
		return <LoginPage />;
	}
};

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement as HTMLElement);
root.render(
	<React.StrictMode>
		<AuthProvider>
			<AppRouter />
		</AuthProvider>
	</React.StrictMode>
);
export default AppRouter;
