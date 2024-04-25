/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, getDatabase, ref, set } from "firebase/database";

export async function getItems() {
	const database = getDatabase();
	try {
		const snapshot = await get(ref(database, "/items"));
		if (snapshot.exists()) {
			const data = snapshot.val();
			return data;
		} else {
			return null; // or appropriate fallback value
		}
	} catch (error) {
		console.error(error);
		return null; // or re-throw the error, depending on how you want to handle failures
	}
}

export async function saveItems(rows: any) {
	const database = getDatabase();
	try {
		const updateQuery = ref(database, "/items");
		set(updateQuery, rows);
	} catch (error) {
		console.error(error);
	}
}
