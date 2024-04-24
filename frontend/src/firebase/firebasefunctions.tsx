import { ref } from "firebase/database";

import { useAuth } from "../contexts/authcontexts.js";
import { database } from "./firebase.js";
import { auth } from "./firebase.js";
/** NOTE: Can write/modularize for different paths. CURRENTLY! only for items. Can use similar setup for everything basically
 *
 *
 * @returns ref
 *
 */
export function useUserItemsRef() {
	const { currentUser } = useAuth();

	const userRef = currentUser
		? ref(database, `Users/${currentUser.uid}/items`)
		: ref(database, "Users/test/posts");

	return userRef;
}

export function useUserReceiptsRef() {
	const { currentUser } = useAuth();

	const receiptsRef = currentUser
		? ref(database, `Users/${currentUser.uid}/receipts`)
		: ref(database, "Users/test/posts");

	return receiptsRef;
}

export function logOut() {
	auth.signOut();
}
