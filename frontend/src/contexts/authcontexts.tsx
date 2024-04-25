import {
	Auth,
	getAuth,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
	User
} from "firebase/auth";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextType {
	currentUser: User | null;
	loginWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const loginWithGoogle = async () => {
	const auth: Auth = getAuth();
	const provider = new GoogleAuthProvider();
	await signInWithPopup(auth, provider);
};
export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);

	useEffect(() => {
		const auth: Auth = getAuth();
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		loginWithGoogle
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
