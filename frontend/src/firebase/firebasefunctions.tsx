import { onValue, ref } from "firebase/database";

import { useAuth } from "../contexts/authcontexts.js";
import { database } from "./firebase.js";

export function useUserRef() {
    const { currentUser } = useAuth();
  

   
    const userRef = currentUser ? ref(database, `Users/${currentUser.uid}/posts`) : ref(database, "Users/test/posts");
  
    return userRef;

  }